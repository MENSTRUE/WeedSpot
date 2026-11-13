# WeedSpot backend

Start from the repository root:

```powershell
$Python = 'C:\DevEnvs\ai-general\Scripts\python.exe'
& $Python -m pip install -r backend\requirements.txt
cd backend
& $Python -m uvicorn app.main:app --reload --port 8000
```

Endpoints: `GET /api/v1/health`, `GET /api/v1/ready`, `POST /api/v1/predict` (multipart `file`). Swagger: `http://127.0.0.1:8000/docs`.

Uses original `models/best.pt` checkpoint and verifies SHA-256 in `reports/experiment_config.json`. If validation fails, `/ready` indicates the error and `/predict` responds 503. Never retrain or substitute weights silently.

For tests: `cd backend; & $Python -m pytest -q`.
