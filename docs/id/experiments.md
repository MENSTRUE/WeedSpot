# Desain eksperimen dan jejak percobaan

> WeedSpot Day 35 V3 | Evidence reviewed 2026-11-13. [Index](README.md) | [Root](../../README.md)

Run riset tercatat sebagai **WeedSpot Day35 V3 FINAL**. `experiment_config.json` menyatakan compact U-Net dari nol, seed 42, resolusi 384, batch 4, hingga 40 epoch dan best epoch 32. `artifact_manifest.json` mencatat validation foreground macro IoU **0.5772258034471679**, SHA-256 checkpoint, serta test held-out tidak digunakan dalam pemilihan. Riwayat per epoch tersedia di `reports/training_history.csv`, bukan angka rekaan dari grafik.

V3 memperbaiki split EWIS1 menjadi sesi lengkap lokasi-dan-tanggal, bukan blok lima gambar; seluruh tile suatu gambar tetap pada satu partisi. Menurut penjelasan notebook, V2 disimpan untuk perbandingan, **tetapi metrik V2 yang dapat direproduksi belum diverifikasi di sini**, sehingga tidak diklaim peningkatan V2→V3. Eksekusi V3 memakai tiling 4×3 meskipun ada komentar lama 3×2. Test akhir dipisahkan per sumber dan belum dijamin site-disjoint.

Checkpoint Torch berbentuk dictionary dengan `model` state, `classes`, `architecture`, `image_size`, `sources`, `best_epoch`, serta skor validasi. File tidak ada di Git karena `*.pt` diabaikan. Output notebook dapat dipulihkan secara terpisah dan divalidasi dengan checksum yang tercatat. Rekam perubahan keputusan/hasil berikutnya ke `reports/` bersama provenance.

Lihat [evaluasi](evaluation.md), [metodologi](methodology.md), dan [reproduksibilitas](reproducibility.md).

---

**Evidence:** [`experiment_config.json`](../../reports/experiment_config.json), [`evaluation_by_source.json`](../../reports/evaluation_by_source.json), [`dataset_provenance.json`](../../reports/dataset_provenance.json), [`notebook`](../../notebooks/weedspot.ipynb).
