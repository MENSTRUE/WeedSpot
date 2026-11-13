# Asal-usul dataset dan lisensi

> WeedSpot Day 35 V3 | Evidence reviewed 2026-11-13. [Index](README.md) | [Root](../../README.md)

**Bukti:** `reports/dataset_provenance.json` dan `reports/mask_audit.json` mencatat 60 pasangan gambar RGB+mask CWFID dan 88 pasangan EWIS1; input Kaggle `/kaggle/input/datasets/wafabila/weedspot-dataset`. CWFID: https://github.com/cwfid/dataset, lisensi yang tercatat adalah riset nonkomersial. EWIS1: https://data.mendeley.com/datasets/6j5pxgf437/1, versi `1` pada URL; **lisensinya belum dicatat** di JSON provenance. Waktu audit/akses yang tercatat: 2026-11-08T10:31:30Z. Hak dataset berbeda dari MIT untuk kode.

| Sumber | Pasangan asli | Latar | Crop | Weed | Catatan |
|---|---:|---|---|---|---|
| CWFID | 60 | RGB 0,0,0 | 255,0,0 | 0,255,0 | mask tiga kelas, domain sumber kecil |
| EWIS1 | 88 | alpha transparan | 31,119,180 | 255,127,14 | domain aerial dengan format mask berbeda |

Kode decoding memetakan warna ke kelas 0/1/2. `mask_audit.json` menyatakan `unknown_fraction_max=0.0` dan tanpa isu yang dilaporkan; ini bukan pengganti audit integritas independen. Jumlah dataset menggambarkan gambar asli, bukan 1.116 citra sesudah tiling. Risiko mencakup domain shift, gulma kecil, keterbatasan metadata lokasi dan hak komersial yang berbeda. **Jangan mendistribusikan gambar mentah melalui repo.**

---

**Evidence:** [`experiment_config.json`](../../reports/experiment_config.json), [`evaluation_by_source.json`](../../reports/evaluation_by_source.json), [`dataset_provenance.json`](../../reports/dataset_provenance.json), [`notebook`](../../notebooks/weedspot.ipynb).
