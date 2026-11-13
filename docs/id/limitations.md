# Batasan dan penggunaan bertanggung jawab

> WeedSpot Day 35 V3 | Evidence reviewed 2026-11-13. [Index](README.md) | [Root](../../README.md)

**Riset:** partisi test kecil, korelasi spasial tile tinggi, metadata site tidak lengkap, grouping CWFID berdasarkan heuristik blok nama file, sesi EWIS1 terpisah berdasarkan lokasi/tanggal tetapi mungkin kembali ke ladang sama, serta domain shift. Cek hash eksak tidak menjamin bebas near-duplicate. Batas antara crop dan weed juga bisa ambigu.

**Model:** false negative gulma kecil akibat resize, crop/weed tertukar, inference gambar utuh 384² meskipun training aerial bertile, confidence softmax belum terkalibrasi, tidak mengenali spesies atau konversi piksel-ke-meter. Belum ada jaminan di pertanian baru, kondisi pencahayaan/cuaca berbeda, atau ketinggian drone lain.

**Engineering:** baru FastAPI/Vite lokal; belum ada identitas pengguna, autentikasi, rate limit, pemindaian file tingkat produksi, regression test E2E lengkap, monitoring atau bukti hosting publik. Gambar tidak sengaja disimpan oleh aplikasi, tetapi audit privasi/keamanan diperlukan sebelum publikasi.

**Hak penggunaan:** MIT kode proyek tidak memberikan hak terhadap gambar CWFID terbatas; lisensi EWIS1 harus diperiksa ke penerbit. Jangan mendistribusikan dataset pihak ketiga atau menganggap hak komersial otomatis. Jangan memakai keluaran untuk penyemprotan herbisida otomatis tanpa evaluasi efektivitas, keamanan dan hukum independen.

**Mitigasi prioritas:** (1) holdout site baru dengan metadata akuisisi, (2) tiling inference resolusi tinggi plus unit test agregasi, (3) audit error tiap kelas dan kalibrasi confidence, (4) validasi lisensi, (5) threat model dan hardening deployment.

---

**Evidence:** [`experiment_config.json`](../../reports/experiment_config.json), [`evaluation_by_source.json`](../../reports/evaluation_by_source.json), [`dataset_provenance.json`](../../reports/dataset_provenance.json), [`notebook`](../../notebooks/weedspot.ipynb).
