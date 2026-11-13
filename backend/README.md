# WeedSpot backend — FastAPI and U-Net inference

## Responsibility and implementation

`app/main.py` exposes `/health`, `/ready`, `/predict` using FastAPI and multipart uploads; `app/model.py` defines training-compatible `Block`, `Up`, and `UNet(n=24)` and wraps checkpoint validation and inference in `Predictor`. `app/__init__.py` identifies package. A lifespan hook loads the model once on app startup. Models use CUDA if available, else CPU; inference serialized via a Python threading lock. This is local research application infrastructure, not a production SaaS.

## Checkpoint and preprocess contract

- Local-only `../models/best.pt` is required; binary is ignored by Git.
- Expected hash comes from `../reports/experiment_config.json`; hash, class order, architecture, image size and `state_dict` must match. `torch.load(weights_only=True)` and `load_state_dict(strict=True)` are used.
- PNG/JPEG/WebP, <10 MiB, max 16 megapixels; EXIF transpose → RGB → bilinear to 384² → normalized `/255` tensor.
- Model logits `[1,3,384,384]` → softmax → `argmax` classes → nearest-neighbor resize to original dimensions → base64 PNG overlay/mask.
- Display palette differs from source label palettes: Background `[23,32,48]`, Crop `[68,134,189]`, Weed `[232,150,86]`. The display palette does not change ground truth classes.

## Endpoints

| Method / route | Contract | Failure / notes |
|---|---|---|
| `GET /api/v1/health` | `{"status":"ok","service":"weedspot-api"}` | Reachability only; not model health |
| `GET /api/v1/ready` | `model_ready`, `model_name`, `device`, `image_size`, `classes`, `checkpoint_sha256_matches`, `detail` | May return HTTP 200 with `model_ready=false` |
| `POST /api/v1/predict` | `multipart/form-data` field `file` (PNG/JPEG/WebP); JSON including `width`, `height`, `class_percentages`, `average_pixel_confidence`, `processing_ms`, `overlay`, `mask`, `palette`, `warning` | 400 invalid/empty, 413 >10 MiB or >16 MP, 415 unsupported MIME, 503 model unavailable, 500 failed inference |

Overlay and mask are **base64 data URLs**. `class_percentages` sum approximately 100% after per-class rounding and refer to the **resized predicted pixel grid returned to original image dimensions**, not calibrated acreage. `average_pixel_confidence` is the mean maximum softmax probability **before upscaling**, not an empirically calibrated correctness probability. `processing_ms` includes preprocessing, model execution and output encoding, not necessarily network transfer.

## Setup and local execution

```powershell
cd 'D:\porto\100 day\day 35'
$Python = 'C:\DevEnvs\ai-general\Scripts\python.exe'
& $Python -m pip install -r backend\requirements.txt
cd frontend
npm ci
npm run build
cd ..
# Terminal 1 (stays running)
.\scripts\run_backend.ps1
# Terminal 2 (new PowerShell tab, from repo root)
.\scripts\run_frontend.ps1
```
Open `http://127.0.0.1:5173`; API schema at `http://127.0.0.1:8000/docs`. Both run scripts assume the **Windows-only shared Python path** above, so other installations must edit `scripts/run_backend.ps1` or run `python -m uvicorn app.main:app` from `backend/` with their own interpreter. `best.pt` must be provisioned separately at `models/best.pt`; it is intentionally ignored by Git.

## Tests and scope

```powershell
$Python = 'C:\DevEnvs\ai-general\Scripts\python.exe'
cd 'D:\porto\100 day\day 35\backend'
& $Python -m pytest -q
Invoke-RestMethod http://127.0.0.1:8000/api/v1/ready | ConvertTo-Json -Depth 5
# From a new terminal:
cd 'D:\porto\100 day\day 35\frontend'
npm run build
```
Expected `ready.model_ready=true` and `checkpoint_sha256_matches=true` only after the correct local checkpoint is loaded. The three tracked API tests check health, readiness contract, and rejection of invalid media type; **they do not test image segmentation quality or complete frontend-to-backend E2E**.

Three tests in `tests/test_api.py`: health response, readiness schema and text-file rejection. Not yet verified automatically: valid image prediction, checksum-negative variants, result pixel mapping, uploads at size boundaries, performance/load, full browser E2E. Do not claim all of these were tested.

## Security and failure handling

CORS permits only the two loopback Vite origins; it is not user authentication. API 503 when model missing, exceptions returned with generic 500 on inference errors. No intentional disk persistence for upload, but generated overlay and mask are returned as response data. For public use, enforce proxy body limits, authentication, rate limits, log redaction, privacy policy, and full adversarial image validation. See [`docs/en/architecture.md`](../docs/en/architecture.md) and [`docs/en/deployment.md`](../docs/en/deployment.md).
