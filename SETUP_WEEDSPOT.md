# WeedSpot Full Stack Integration

This ZIP adds backend, frontend, and launch scripts. It does not replace any existing notebook, model, report, LICENSE, or README. The model uses the exact UNet(n=24) implementation in `notebooks/weedspot.ipynb`, and checks the recorded checkpoint hash before loading.

Windows PowerShell 5.1:

```powershell
cd 'D:\porto\100 day\day 35'
& 'C:\DevEnvs\ai-general\Scripts\python.exe' -m pip install -r backend\requirements.txt
cd frontend
npm install
npm run build
cd ..
# Terminal 1:
.\scripts\run_backend.ps1
# Terminal 2:
.\scripts\run_frontend.ps1
```

Open http://127.0.0.1:5173 and http://127.0.0.1:8000/docs

API returns 503 when the checkpoint is absent or fails integrity or architecture checks. Background/crop/weed are semantic segmentation predictions. `average_pixel_confidence` is the mean predicted softmax maximum, not calibrated confidence. Image percentages are not physical land area.

The backend uses PIL and strict image decoding. Requests are limited to 10MB and 16MP. Images are not stored on the server, though responses include base64 overlays.
