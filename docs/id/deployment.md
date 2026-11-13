# Deployment lokal dan kesiapan keamanan

> WeedSpot Day 35 V3 | Evidence reviewed 2026-11-13. [Index](README.md) | [Root](../../README.md)

**Lingkungan yang terbukti:** Windows PowerShell 5.1 memakai `C:\DevEnvs\ai-general\Scripts\python.exe`, dev server Vite `127.0.0.1:5173`, Uvicorn `127.0.0.1:8000`, dan screenshot inference gambar lokal dari pengguna. Ini **bukan bukti deployment produksi publik/cloud**.

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

**Preflight:** `models/best.pt` dan hash benar, dependensi backend terpasang, frontend `npm ci`, port tersedia, readiness true, dan gambar yang didukung menghasilkan prediksi. Browser dan API memakai proses terpisah. `frontend/dist/` merupakan hasil `npm run build`; skrip sekarang belum mengimplementasikan hosting statis.

**Gerbang keamanan sebelum publik:** origin eksplisit, reverse-proxy TLS, autentikasi/otorisasi, rate limit, tes decompression attack, batas ukuran di proxy, timeout, kebijakan log/retensi, audit dependensi, metrik concurrency, persetujuan/privasi, distribusi artefak aman, lisensi dataset, dan evaluasi lapangan. Kalimat UI mengenai data tidak disimpan bukan jaminan perilaku logging/hosting pihak ketiga.

**Catatan `.env.example`:** file yang dilacak masih menyebut `APP_PORT=8012` dan `MODEL_PATH=models/best_model.onnx`, tetapi **kode Python dan PowerShell saat ini tidak memakai pengaturan itu**: backend berjalan di 8000 dan model pada `models/best.pt`. Ini contoh konfigurasi lama, bukan opsi runtime aktif. Jangan mengandalkannya untuk deployment.

---

**Evidence:** [`experiment_config.json`](../../reports/experiment_config.json), [`evaluation_by_source.json`](../../reports/evaluation_by_source.json), [`dataset_provenance.json`](../../reports/dataset_provenance.json), [`notebook`](../../notebooks/weedspot.ipynb).
