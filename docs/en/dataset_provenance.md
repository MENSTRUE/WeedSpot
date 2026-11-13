# Dataset provenance and licensing

> WeedSpot Day 35 V3 | Evidence reviewed 2026-11-13. [Index](README.md) | [Root](../../README.md)

**Evidence:** `reports/dataset_provenance.json` and `reports/mask_audit.json` record CWFID 60 and EWIS1 88 original RGB+mask pairs; Kaggle input `/kaggle/input/datasets/wafabila/weedspot-dataset`. CWFID: https://github.com/cwfid/dataset, license noted as noncommercial research. EWIS1: https://data.mendeley.com/datasets/6j5pxgf437/1, publication/version `1` in link; machine-readable license is **not captured** in provenance. The listed source access/audit time is 2026-11-08T10:31:30Z. Use these rights separately from repository MIT license.

| Source | Orig pairs | Background | Crop | Weed | Notes |
|---|---:|---|---|---|---|
| CWFID | 60 | RGB 0,0,0 | 255,0,0 | 0,255,0 | paired three-class masks, small source domain |
| EWIS1 | 88 | transparent alpha | 31,119,180 | 255,127,14 | aerial domain, different mask semantics |

The decoding code maps colors to class IDs 0/1/2. `mask_audit.json` records `unknown_fraction_max=0.0` and no reported issues; note this does not replace a new independent media-integrity audit. Dataset volumes describe originals, not 1,116 post-tiling images. Risks: imaging domain shift, small weeds, missing site-level metadata, potentially differing commercial rights. **Do not redistribute source imagery in this repo.**

---

**Evidence:** [`experiment_config.json`](../../reports/experiment_config.json), [`evaluation_by_source.json`](../../reports/evaluation_by_source.json), [`dataset_provenance.json`](../../reports/dataset_provenance.json), [`notebook`](../../notebooks/weedspot.ipynb).
