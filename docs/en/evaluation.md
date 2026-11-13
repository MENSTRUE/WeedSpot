# Evaluation and uncertainty

> WeedSpot Day 35 V3 | Evidence reviewed 2026-11-13. [Index](README.md) | [Root](../../README.md)

**Definitions:** IoU is intersection divided by union for each class. Foreground mIoU is the arithmetic mean of **Crop IoU and Weed IoU**, excluding Background. Pixel accuracy counts all pixels and can be misleading where the background dominates. Values below are **recorded experimental results**, not a new independent run.

| Source / split | Originals | Tiles | Background IoU | Crop IoU | Weed IoU | Foreground mIoU | Pixel accuracy |
|---|---:|---:|---:|---:|---:|---:|---:|
| CWFID validation | 10 | 10 | 0.9913 | 0.7924 | 0.6149 | 0.7036 | 0.9884 |
| EWIS1 validation | 14 | 168 | 0.9918 | 0.7050 | 0.4201 | 0.5626 | 0.9903 |
| CWFID test | 10 | 10 | 0.9901 | 0.7452 | 0.3410 | 0.5431 | 0.9834 |
| EWIS1 test | 14 | 168 | 0.9872 | 0.6477 | 0.3985 | 0.5231 | 0.9842 |

**Confidence intervals:** `parent_bootstrap_ci.json` reports parent-level 95% intervals (400 resamples): CWFID Crop `[0.5895,0.8087]`, Weed `[0.1710,0.5424]`, foreground mIoU `[0.4246,0.6591]`; EWIS1 Crop `[0.5835,0.7065]`, Weed `[0.3223,0.4583]`, foreground `[0.4784,0.5693]`. Independent units are **10 CWFID and 14 EWIS1 original test images**, not 10 and 168 equally independent field sites.

The raw confusion matrices live in `reports/{val,test}_{CWFID,EWIS1}_confusion.csv`; `evaluation_by_source.json` is the numerical source of truth. Interpret common uncertainty: weed textures can resemble crops, small plants lose information after downsampling, and domain shift changes color/resolution. No unseen geographic-site evaluation is established. Model must not be represented as 98–99% accurate weed detection merely because pixel accuracy is near that range.

---

**Evidence:** [`experiment_config.json`](../../reports/experiment_config.json), [`evaluation_by_source.json`](../../reports/evaluation_by_source.json), [`dataset_provenance.json`](../../reports/dataset_provenance.json), [`notebook`](../../notebooks/weedspot.ipynb).
