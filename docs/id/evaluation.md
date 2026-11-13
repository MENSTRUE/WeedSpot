# Evaluasi dan ketidakpastian

> WeedSpot Day 35 V3 | Evidence reviewed 2026-11-13. [Index](README.md) | [Root](../../README.md)

**Definisi:** IoU = irisan dibagi gabungan setiap kelas. Foreground mIoU adalah rerata **IoU Crop dan IoU Weed**, tanpa Background. Pixel accuracy menghitung seluruh piksel dan dapat menyesatkan bila latar mendominasi. Angka berikut adalah **hasil eksperimen yang tercatat**, bukan evaluasi independen baru.

| Source / split | Originals | Tiles | Background IoU | Crop IoU | Weed IoU | Foreground mIoU | Pixel accuracy |
|---|---:|---:|---:|---:|---:|---:|---:|
| CWFID validation | 10 | 10 | 0.9913 | 0.7924 | 0.6149 | 0.7036 | 0.9884 |
| EWIS1 validation | 14 | 168 | 0.9918 | 0.7050 | 0.4201 | 0.5626 | 0.9903 |
| CWFID test | 10 | 10 | 0.9901 | 0.7452 | 0.3410 | 0.5431 | 0.9834 |
| EWIS1 test | 14 | 168 | 0.9872 | 0.6477 | 0.3985 | 0.5231 | 0.9842 |

**Interval kepercayaan:** `parent_bootstrap_ci.json` mencatat interval 95% tingkat gambar induk (400 resampling): CWFID Crop `[0.5895,0.8087]`, Weed `[0.1710,0.5424]`, foreground `[0.4246,0.6591]`; EWIS1 Crop `[0.5835,0.7065]`, Weed `[0.3223,0.4583]`, foreground `[0.4784,0.5693]`. Unit independen hanya **10 gambar test asli CWFID dan 14 EWIS1**, bukan 10 dan 168 lokasi ladang independen.

Confusion matrix asli tersimpan di `reports/{val,test}_{CWFID,EWIS1}_confusion.csv`; `evaluation_by_source.json` menjadi sumber angka. Ketidakpastian mencakup tekstur gulma yang mirip tanaman, gulma kecil saat downsampling, dan perubahan domain warna/resolusi. Evaluasi untuk lokasi geografis baru belum terbukti. Jangan mengklaim deteksi gulma 98–99% akurat hanya karena pixel accuracy berada di kisaran tersebut.

---

**Evidence:** [`experiment_config.json`](../../reports/experiment_config.json), [`evaluation_by_source.json`](../../reports/evaluation_by_source.json), [`dataset_provenance.json`](../../reports/dataset_provenance.json), [`notebook`](../../notebooks/weedspot.ipynb).
