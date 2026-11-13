# Kartu model — WeedSpot V3

> WeedSpot Day 35 V3 | Evidence reviewed 2026-11-13. [Index](README.md) | [Root](../../README.md)

**Identitas:** WeedSpot V3 Compact U-Net, segmentasi semantik tiga kelas, lebar dasar 24, RGB 384×384, bobot Torch `models/best.pt` (disediakan lokal). **Tujuan:** screening wilayah crop dan weed untuk riset dengan tinjauan manusia. **Tidak ditujukan:** pemakaian komersial tanpa pemeriksaan lisensi, penyemprotan otomatis, probabilitas terkalibrasi, luas lahan, identifikasi spesies, maupun keputusan keselamatan kritis.

**Data training:** 60 pasangan CWFID dan 88 EWIS1 asli; sumber aerial ditile 4×3 dan split pada induk asli. **Output:** logit kelas `N×3×384×384`, argmax kelas `0=Background,1=Crop,2=Weed`; mask/overlay diproses ulang ke ukuran gambar unggahan.

**Pemilihan:** epoch 32, validation foreground mIoU 0.5772. **Held-out:** CWFID foreground mIoU 0.5431, Weed IoU 0.3410; EWIS1 foreground mIoU 0.5231, Weed IoU 0.3985. Test hanya memuat sedikit gambar asli dan independensi lapangan baru belum teruji. Confidence ialah rerata maksimum softmax, bukan kalibrasi.

**Integritas:** SHA-256 `6380680aa33892dcdbe8b531d3642dca17434f2436717673fa6773fa07c22e7a` dari `reports/experiment_config.json`. Loader memverifikasi arsitektur, urutan kelas, ukuran gambar, state dict dan hash. **Keselamatan:** perlakukan keluaran sebagai bantuan visual; perlu validasi lapangan dan manusia; audit domain baru, gulma kecil, serta batas objek ambigu. Lihat dokumen sebelumnya `reports/MODEL_CARD.md` dan [evaluasi](evaluation.md).

---

**Evidence:** [`experiment_config.json`](../../reports/experiment_config.json), [`evaluation_by_source.json`](../../reports/evaluation_by_source.json), [`dataset_provenance.json`](../../reports/dataset_provenance.json), [`notebook`](../../notebooks/weedspot.ipynb).
