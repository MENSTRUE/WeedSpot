# WeedSpot research notebook

`weedspot.ipynb` is the recorded **Day 35 V3 FINAL**, designed for Kaggle T4 GPU and input `/kaggle/input/datasets/wafabila/weedspot-dataset`. It performs original data discovery and mask audit, location-date session grouping for EWIS1, CWFID heuristic grouping, exact duplicate checks, image-level split, EWIS1 4×3 tiling, source-balanced loader construction, scratch `UNet(n=24)` training, validation-only checkpoint selection, test evaluation by source, parent-bootstrap confidence intervals and plot/report export.

**Execution order:** inspect input and licensing → execute notebook cells in order from setup to exports → audit masks/partitions → train until best epoch/early stop → export and hash checkpoint → record CSV/JSON and samples. Do not run notebook against a different dataset version without noting the change. Keep raw datasets and temporary image tiles in Kaggle working storage, not the repository.

**Recorded configuration:** 384×384, batch 4, seed 42, max 40 epochs, best epoch 32, validation foreground mIoU 0.5772258. Results are in `reports/`. Notebook text contains an outdated reference to 3×2 tiling; the executable code actually creates `nx,ny=(4,3)` for EWIS1, i.e. twelve tiles per original. Do not change V3 results retroactively.

**Expected outputs:** `models/best.pt` and experiment CSV/JSON reports, plus training and qualitative plots. Git does **not** include checkpoint or raw source images. A new run's hash may differ; preserve exact lineage rather than claim identity with archived V3. See [`docs/en/reproducibility.md`](../docs/en/reproducibility.md) and [`docs/id/experiments.md`](../docs/id/experiments.md).
