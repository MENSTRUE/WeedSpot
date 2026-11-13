from __future__ import annotations
import io
from contextlib import asynccontextmanager
from PIL import Image, ImageOps, UnidentifiedImageError
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from .model import predictor

MAX_FILE_BYTES = 10 * 1024 * 1024
MAX_PIXELS = 16_000_000

@asynccontextmanager
async def lifespan(app: FastAPI):
    predictor.load()
    yield

app = FastAPI(title='WeedSpot API', version='1.0.0', lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=['http://localhost:5173', 'http://127.0.0.1:5173'], allow_methods=['GET', 'POST'], allow_headers=['*'])

@app.get('/api/v1/health')
def health():
    return {'status': 'ok', 'service': 'weedspot-api'}

@app.get('/api/v1/ready')
def ready():
    return predictor.info()

@app.post('/api/v1/predict')
async def predict(file: UploadFile = File(...)):
    if file.content_type not in {'image/png', 'image/jpeg', 'image/webp'}:
        raise HTTPException(415, detail='Only PNG, JPG, and WebP images are supported.')
    try:
        raw = await file.read(MAX_FILE_BYTES + 1)
        if len(raw) > MAX_FILE_BYTES:
            raise HTTPException(413, detail='Image exceeds 10 MB limit.')
        if not raw:
            raise HTTPException(400, detail='Empty image.')
        with Image.open(io.BytesIO(raw)) as im:
            if im.width * im.height > MAX_PIXELS:
                raise HTTPException(413, detail='Image exceeds 16 megapixels.')
            image = ImageOps.exif_transpose(im).convert('RGB')
    except HTTPException:
        raise
    except (UnidentifiedImageError, OSError, ValueError):
        raise HTTPException(400, detail='Invalid or corrupted image.')
    if predictor.model is None:
        raise HTTPException(503, detail=predictor.error or 'Checkpoint not ready')
    try:
        return predictor.predict(image)
    except Exception:
        raise HTTPException(500, detail='Inference failed. Check server logs.')
