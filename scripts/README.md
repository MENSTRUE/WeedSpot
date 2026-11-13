# Local utility scripts

## `run_backend.ps1`

Runs backend Uvicorn from `backend/`, using hardcoded shared Windows interpreter `C:\DevEnvs\ai-general\Scripts\python.exe`, `--reload`, loopback `127.0.0.1`, port 8000. The interpreter must exist; this script is Windows-specific. `--reload` is for development and not suitable as a production supervisor.

## `run_frontend.ps1`

Changes directory to `frontend/` and invokes `npm run dev` (Vite loopback 127.0.0.1:5173). Requires Node and dependencies from `npm ci`.

```powershell
cd 'D:\porto\100 day\day 35'
.\scripts\run_backend.ps1   # terminal 1
.\scripts\run_frontend.ps1  # terminal 2, separately
```

The scripts neither train models nor download data. They require a separate local `models/best.pt` and correct package installation. No dataset download script is part of the audited source. Do not modify them merely to accept the obsolete `.env.example` port 8012 or ONNX path unless the application code is updated accordingly. For deployment, see [`docs/en/deployment.md`](../docs/en/deployment.md).
