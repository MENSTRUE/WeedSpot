# System architecture and API contract

> WeedSpot Day 35 V3 | Evidence reviewed 2026-11-13. [Index](README.md) | [Root](../../README.md)

**Frontend:** React 19, TypeScript, Vite development proxy `/api → http://127.0.0.1:8000`. `src/App.tsx` implements file state, drag/drop selection, `fetch('/api/v1/ready')`, FormData POST, compare slider, overlay/mask/original tabs and data-URL downloads. No route framework or persistent server-side account state is present.

**Backend:** `backend/app/main.py` uses FastAPI 1.0.0 app, loads `Predictor` at lifespan, enables CORS only for `localhost:5173` and `127.0.0.1:5173`, validates 10 MiB/16 MP and supported MIME, performs EXIF transpose and converts to RGB. `backend/app/model.py` checks local checkpoint hash and metadata, runs `UNet(n=24)` with PyTorch (CUDA if available, otherwise CPU), predicts softmax/argmax, restores output resolution with nearest-neighbor labels and returns base64 PNG mask and overlay.

```mermaid
sequenceDiagram
 participant User
 participant React
 participant FastAPI
 participant UNet
 User->>React: Select agricultural image
 React->>FastAPI: GET /api/v1/ready
 FastAPI-->>React: model_ready + detail
 React->>FastAPI: POST /api/v1/predict (multipart file)
 FastAPI->>UNet: RGB tensor 1x3x384x384
 UNet-->>FastAPI: logits 1x3x384x384
 FastAPI-->>React: mask, overlay, percentages, timing
 React-->>User: Compare, inspect, download
```

| Method / route | Contract | Failure / notes |
|---|---|---|
| `GET /api/v1/health` | `{"status":"ok","service":"weedspot-api"}` | Reachability only; not model health |
| `GET /api/v1/ready` | `model_ready`, `model_name`, `device`, `image_size`, `classes`, `checkpoint_sha256_matches`, `detail` | May return HTTP 200 with `model_ready=false` |
| `POST /api/v1/predict` | `multipart/form-data` field `file` (PNG/JPEG/WebP); JSON including `width`, `height`, `class_percentages`, `average_pixel_confidence`, `processing_ms`, `overlay`, `mask`, `palette`, `warning` | 400 invalid/empty, 413 >10 MiB or >16 MP, 415 unsupported MIME, 503 model unavailable, 500 failed inference |

Overlay and mask are **base64 data URLs**. `class_percentages` sum approximately 100% after per-class rounding and refer to the **resized predicted pixel grid returned to original image dimensions**, not calibrated acreage. `average_pixel_confidence` is the mean maximum softmax probability **before upscaling**, not an empirically calibrated correctness probability. `processing_ms` includes preprocessing, model execution and output encoding, not necessarily network transfer.

**Example:** `curl.exe -F "file=@D:\images\field.png" http://127.0.0.1:8000/api/v1/predict` on Windows; save JSON to a file because base64 responses are large. There is **no persistent upload endpoint**. CORS is not authentication; avoid exposing development service without security hardening.

---

**Evidence:** [`experiment_config.json`](../../reports/experiment_config.json), [`evaluation_by_source.json`](../../reports/evaluation_by_source.json), [`dataset_provenance.json`](../../reports/dataset_provenance.json), [`notebook`](../../notebooks/weedspot.ipynb).
