# Troubleshooting and diagnosis

> WeedSpot Day 35 V3 | Evidence reviewed 2026-11-13. [Index](README.md) | [Root](../../README.md)

| Symptom | Likely cause | Check / remedy |
|---|---|---|
| UI says Model unavailable | API down, missing checkpoint or failed hash | `GET /api/v1/ready`; inspect `detail`, verify local `best.pt` hash |
| Port 8000 busy | Another process bound to Uvicorn port | Stop old process, inspect `Get-NetTCPConnection -LocalPort 8000` |
| `ModuleNotFoundError: app` | Started Uvicorn outside `backend/` | `cd backend; & $Python -m uvicorn app.main:app --reload --port 8000` |
| SHA-256 mismatch | Wrong/corrupted checkpoint | `Get-FileHash .\models\best.pt -Algorithm SHA256`, compare JSON, recover exact artifact; never bypass check |
| 400 / 413 / 415 | Broken file, too large, disallowed media | PNG/JPEG/WebP, <10 MiB and ≤16 MP; inspect decode and MIME |
| Browser cannot call API | Backend down or proxy unavailable | Use Vite dev port 5173 and confirm `/api/v1/ready` |
| `npm run build` error | Missing dependencies or TypeScript errors | `cd frontend; npm ci; npm run build` |
| Weed region looks implausible | Source/domain shift or whole-image resize | Compare against ground truth, do not interpret as accuracy; test new field images |
| Model included in notebook but not Git | `*.pt` in `.gitignore` | Restore/checkpoint locally under `models/best.pt` |

**Diagnostic commands:**

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

On failure, save error log without exposing secrets, describe filename, input dimensions, model-readiness JSON and expected/actual artifact hash. No quality claims before paired GT comparison.

---

**Evidence:** [`experiment_config.json`](../../reports/experiment_config.json), [`evaluation_by_source.json`](../../reports/evaluation_by_source.json), [`dataset_provenance.json`](../../reports/dataset_provenance.json), [`notebook`](../../notebooks/weedspot.ipynb).
