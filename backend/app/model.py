from __future__ import annotations
import hashlib
import io
import json
from pathlib import Path
from threading import Lock
import time

import numpy as np
from PIL import Image
import torch
from torch import nn
from torch.nn import functional as F

ROOT = Path(__file__).resolve().parents[2]
CKPT = ROOT / 'models' / 'best.pt'
CONFIG = ROOT / 'reports' / 'experiment_config.json'
CLASSES = ('Background', 'Crop', 'Weed')
COLORS = np.array([[23, 32, 48], [68, 134, 189], [232, 150, 86]], dtype=np.uint8)

class Block(nn.Module):
    def __init__(self, a: int, b: int):
        super().__init__()
        self.net = nn.Sequential(
            nn.Conv2d(a, b, 3, padding=1, bias=False), nn.BatchNorm2d(b), nn.ReLU(inplace=True),
            nn.Conv2d(b, b, 3, padding=1, bias=False), nn.BatchNorm2d(b), nn.ReLU(inplace=True),
        )
    def forward(self, x):
        return self.net(x)

class Up(nn.Module):
    def __init__(self, a: int, skip: int, b: int):
        super().__init__()
        self.b = Block(a + skip, b)
    def forward(self, x, skip):
        return self.b(torch.cat([F.interpolate(x, size=skip.shape[-2:], mode='bilinear', align_corners=False), skip], 1))

class UNet(nn.Module):
    # Exact layer names and arrangement of WeedSpot V3 training notebook.
    def __init__(self, n: int = 24):
        super().__init__()
        self.p = nn.MaxPool2d(2)
        self.e1 = Block(3, n)
        self.e2 = Block(n, n * 2)
        self.e3 = Block(n * 2, n * 4)
        self.mid = Block(n * 4, n * 8)
        self.u3 = Up(n * 8, n * 4, n * 4)
        self.u2 = Up(n * 4, n * 2, n * 2)
        self.u1 = Up(n * 2, n, n)
        self.head = nn.Conv2d(n, 3, 1)
    def forward(self, x):
        a = self.e1(x)
        b = self.e2(self.p(a))
        c = self.e3(self.p(b))
        z = self.mid(self.p(c))
        return self.head(self.u1(self.u2(self.u3(z, c), b), a))

class Predictor:
    def __init__(self):
        self.model = None
        self.error = None
        self.expected_sha256 = None
        self.actual_sha256 = None
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.lock = Lock()
        self.image_size = 384

    def load(self):
        self.model = None
        self.error = None
        if not CKPT.is_file():
            self.error = f'Missing checkpoint: {CKPT}'
            return
        try:
            cfg = json.loads(CONFIG.read_text(encoding='utf-8-sig'))
            self.expected_sha256 = cfg['checkpoint_sha256'].lower()
            with CKPT.open('rb') as fp:
                sha = hashlib.sha256()
                for chunk in iter(lambda: fp.read(1024 * 1024), b''):
                    sha.update(chunk)
                self.actual_sha256 = sha.hexdigest()
            if self.actual_sha256 != self.expected_sha256:
                raise ValueError('Checkpoint SHA-256 does not match reports/experiment_config.json')
            saved = torch.load(CKPT, map_location='cpu', weights_only=True)
            if not isinstance(saved, dict) or 'model' not in saved:
                raise ValueError('Unsupported checkpoint format: expected a dict with model state_dict')
            if saved.get('architecture') != 'UNet(n=24)':
                raise ValueError(f"Architecture mismatch: {saved.get('architecture')!r}")
            if list(saved.get('classes', [])) != list(CLASSES):
                raise ValueError(f"Class mapping mismatch: {saved.get('classes')!r}")
            if int(saved.get('image_size', 0)) != self.image_size:
                raise ValueError('Checkpoint input resolution mismatch')
            model = UNet(n=24)
            model.load_state_dict(saved['model'], strict=True)
            self.model = model.to(self.device).eval()
        except Exception as exc:
            self.error = f'{type(exc).__name__}: {exc}'

    def info(self):
        return {
            'model_ready': self.model is not None,
            'model_name': 'WeedSpot V3 Compact U-Net',
            'device': str(self.device),
            'image_size': self.image_size,
            'classes': list(CLASSES),
            'checkpoint_sha256_matches': self.actual_sha256 == self.expected_sha256 if self.actual_sha256 and self.expected_sha256 else False,
            'detail': self.error or 'Checkpoint loaded and validated',
        }

    @staticmethod
    def png_base64(image: Image.Image) -> str:
        import base64
        buffer = io.BytesIO()
        image.save(buffer, format='PNG', optimize=True)
        return 'data:image/png;base64,' + base64.b64encode(buffer.getvalue()).decode('ascii')

    def predict(self, image: Image.Image, opacity: float = 0.48):
        if self.model is None:
            raise RuntimeError(self.error or 'Model not ready')
        started = time.perf_counter()
        image = image.convert('RGB')
        orig_size = image.size
        resized = image.resize((self.image_size, self.image_size), Image.Resampling.BILINEAR)
        x = np.asarray(resized, dtype=np.uint8).transpose(2, 0, 1).copy()
        tensor = torch.from_numpy(x).float().unsqueeze(0).to(self.device) / 255.0
        with self.lock, torch.inference_mode():
            logits = self.model(tensor)
            probs = logits.softmax(dim=1)
            labels = probs.argmax(dim=1)[0].cpu().numpy().astype(np.uint8)
            confidence = probs.max(dim=1).values[0].mean().item()
        # Nearest-neighbor for discrete labels. Resize prediction back to input's size.
        label_image = Image.fromarray(labels, 'L').resize(orig_size, Image.Resampling.NEAREST)
        label_array = np.asarray(label_image)
        segmentation = Image.fromarray(COLORS[label_array], 'RGB')
        overlay = Image.blend(image, segmentation, opacity)
        total = int(label_array.size)
        percentages = {CLASSES[i].lower(): round(float(np.count_nonzero(label_array == i) / total * 100), 2) for i in range(3)}
        return {
            'width': orig_size[0], 'height': orig_size[1],
            'class_percentages': percentages,
            'average_pixel_confidence': round(confidence, 4),
            'processing_ms': round((time.perf_counter() - started) * 1000, 1),
            'overlay': self.png_base64(overlay),
            'mask': self.png_base64(segmentation),
            'palette': {CLASSES[i].lower(): COLORS[i].tolist() for i in range(3)},
            'warning': 'Research screening only. Percentages describe predicted image pixels, not physical field area.',
        }

predictor = Predictor()
