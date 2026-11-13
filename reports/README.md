# WeedSpot research evidence registry

This folder contains recorded **WeedSpot Day 35 V3 FINAL** audit, training, validation and held-out-test outputs. Treat JSON and CSV values as experiment evidence; do not overwrite them merely to match a README draft.

| File | Meaning |
|---|---|
| `artifact_manifest.json` | checkpoint hash, champion epoch, validation score and selection policy |
| `experiment_config.json` | training setup and exact checkpoint SHA-256 |
| `dataset_provenance.json` | dataset URLs, license notes, Kaggle path and limitations |
| `mask_audit.json` | source palettes and unknown label audit |
| `split_quality.json` | session grouping and count / SHA conflict audit |
| `original_split_manifest.csv` | original-image group/split ledger |
| `tile_manifest.csv` | processed tiles and parent split identity |
| `source_inventory.csv`, `source_pixel_distribution.csv` | file and annotation pixel inventory |
| `training_history.csv` | logged train and validation trajectory |
| `evaluation_by_source.json` | per-source validation/test metrics |
| `parent_bootstrap_ci.json` | parent-level bootstrap confidence intervals |
| `val_*_confusion.csv`, `test_*_confusion.csv` | confusion matrices per source and partition |
| `MODEL_CARD.md` | earlier short research model card |
| `recovery_audit.txt` | local repository recovery inventory, not proof of ML accuracy |

**Important documentation correction:** earlier README text claimed *EWIS1 3×2*; the executed V3 notebook uses **4×3**, which yields 12 EWIS1 tiles per original. Do not infer source-site independence solely from a session-disjoint split. Report per-source IoU, not only background-weighted pixel accuracy. Training image count differs from original image count; see [`docs/en/evaluation.md`](../docs/en/evaluation.md). Visual files are in `assets/` and are linked by the root README.
