# Reproduksibilitas dan integritas artefak

> WeedSpot Day 35 V3 | Evidence reviewed 2026-11-13. [Index](README.md) | [Root](../../README.md)

**Sumber:** notebook `notebooks/weedspot.ipynb`, dataset asli CWFID/EWIS1, laporan eksperimen, manifest pembagian gambar/mask dan kebutuhan Python. Header notebook menyatakan input `/kaggle/input/datasets/wafabila/weedspot-dataset`, seed 42 dan GPU T4. Download/copy data sesuai hak penggunaan; jangan versioning data mentah.

Reproduksi split dan tiling EWIS1 4×3 sebelum training; latih `UNet(n=24)` dengan dataloader/optimizer/loss/validasi dalam notebook. Pilih checkpoint terbaik melalui foreground macro IoU validation, bukan test. Ekspor `models/best.pt` dan reports, lalu jalankan `Get-FileHash .\models\best.pt -Algorithm SHA256`. Hash artefak asli: `6380680aa33892dcdbe8b531d3642dca17434f2436717673fa6773fa07c22e7a`; model hasil training baru **biasanya memiliki hash lain** dan tidak boleh disebut checkpoint V3 identik.

Aplikasi lokal memerlukan PyTorch, `backend/requirements.txt`, `npm ci` di frontend dan checkpoint lokal. Backend memakai `weights_only=True` dan `state_dict` eksak. Pengujian dan readiness:

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

**Batas reproduksi:** Git menyimpan notebook serta laporan CSV/JSON tetapi *tidak* menyimpan gambar asli atau checkpoint. Clone saja tidak cukup untuk reproduksi identik. Notebook memiliki komentar lama 3×2, tetapi loop V3 yang berjalan memakai `nx,ny=(4,3)`. Simpan log mentah, catat perangkat, versi library, lama training dan semua perbedaan sebelum mempublikasikan hasil baru.

---

**Evidence:** [`experiment_config.json`](../../reports/experiment_config.json), [`evaluation_by_source.json`](../../reports/evaluation_by_source.json), [`dataset_provenance.json`](../../reports/dataset_provenance.json), [`notebook`](../../notebooks/weedspot.ipynb).
