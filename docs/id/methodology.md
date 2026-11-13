# Metodologi penelitian

> WeedSpot Day 35 V3 | Evidence reviewed 2026-11-13. [Index](README.md) | [Root](../../README.md)

Tahapan: (1) penemuan sumber; (2) verifikasi gambar-mask dan warna; (3) audit hash/kelompok; (4) pembagian train/validation/test berdasarkan blok CWFID dan sesi lokasi-tanggal EWIS1 **sebelum** tiling; (5) pemotongan EWIS1 4×3; (6) RGB bilinear dan mask nearest ke 384²; (7) augmentasi flip, rotasi 90° dan kecerahan khusus train; (8) sampling seimbang sumber serta lebih memperhatikan gulma; (9) loss supervisi U-Net; (10) pemilihan checkpoint berdasarkan validation saja; (11) IoU test per sumber dan ketidakpastian bootstrap induk gambar.

`UNet(n=24)` memakai dua Conv2d–BatchNorm–ReLU per blok, encoder lebar 24/48/96 dengan bottleneck 192, decoder skip connection dan bilinear, serta head tiga kanal per piksel. Notebook menggunakan AdamW, cosine LR scheduler, clipping dan weighted CE `[0.15,1.0,3.0]` ditambah `0.7 ×` foreground Dice. Label 255 diabaikan. Kelas keluaran Background / Crop / Weed.

**Perbedaan training/inference:** saat training EWIS1 menjadi 12 tile 384px per gambar asli, sedangkan FastAPI saat ini meresize satu foto utuh langsung ke 384². Detail aerial resolusi tinggi bisa hilang; solusinya tiling inference yang diuji, bukan mengklaim parity. Notebook: [`notebooks/weedspot.ipynb`](../../notebooks/weedspot.ipynb).

---

**Evidence:** [`experiment_config.json`](../../reports/experiment_config.json), [`evaluation_by_source.json`](../../reports/evaluation_by_source.json), [`dataset_provenance.json`](../../reports/dataset_provenance.json), [`notebook`](../../notebooks/weedspot.ipynb).
