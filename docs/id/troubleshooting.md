# Penanganan masalah dan diagnosis

> WeedSpot Day 35 V3 | Evidence reviewed 2026-11-13. [Index](README.md) | [Root](../../README.md)

| Gejala | Penyebab mungkin | Pemeriksaan / solusi |
|---|---|---|
| UI Model unavailable | API mati, checkpoint hilang atau hash gagal | `GET /api/v1/ready`; baca `detail`, periksa hash `best.pt` lokal |
| Port 8000 dipakai | Proses lain memakai port | Hentikan proses lama; `Get-NetTCPConnection -LocalPort 8000` |
| `ModuleNotFoundError: app` | Uvicorn dijalankan di luar `backend/` | `cd backend; & $Python -m uvicorn app.main:app --reload --port 8000` |
| SHA-256 mismatch | Checkpoint salah/rusak | `Get-FileHash .\models\best.pt -Algorithm SHA256`, cocokkan JSON, pulihkan artefak asli; jangan lewati validasi |
| 400 / 413 / 415 | File rusak, terlalu besar, tipe tidak didukung | PNG/JPEG/WebP, <10 MiB dan ≤16 MP; cek MIME serta decoding |
| Browser gagal ke API | Backend mati atau proxy tidak berjalan | Jalankan Vite port 5173 dan pastikan `/api/v1/ready` |
| `npm run build` gagal | Dependensi belum ada atau TS error | `cd frontend; npm ci; npm run build` |
| Prediksi gulma aneh | Domain shift atau resize seluruh gambar | Bandingkan dengan ground truth; jangan klaim akurasi dari visual, uji ladang baru |
| Model ada di notebook tetapi tidak di Git | `*.pt` ada di `.gitignore` | Pulihkan checkpoint lokal ke `models/best.pt` |

**Perintah diagnosis:**

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

Jika gagal, simpan log tanpa rahasia, sebutkan nama file, dimensi input, JSON readiness dan hash artefak. Jangan mengklaim kualitas sebelum dibandingkan dengan GT.

---

**Evidence:** [`experiment_config.json`](../../reports/experiment_config.json), [`evaluation_by_source.json`](../../reports/evaluation_by_source.json), [`dataset_provenance.json`](../../reports/dataset_provenance.json), [`notebook`](../../notebooks/weedspot.ipynb).
