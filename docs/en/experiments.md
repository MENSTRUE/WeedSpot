# Experiment design and lineage

> WeedSpot Day 35 V3 | Evidence reviewed 2026-11-13. [Index](README.md) | [Root](../../README.md)

The research run is recorded as **WeedSpot Day35 V3 FINAL**. `experiment_config.json` identifies scratch compact U-Net, seed 42, image 384, batch 4, up to 40 epochs, and best epoch 32. `artifact_manifest.json` records validation foreground macro IoU **0.5772258034471679**, checkpoint SHA-256, and explicit non-use of held-out test for selection. Epoch-by-epoch history is in `reports/training_history.csv`, not manufactured from charts.

V3 corrects the prior EWIS1 split by complete location-and-date session instead of blocks of five; parent images stay in one partition. V2 was preserved for comparison according to notebook prose, **but no reproducible V2 metrics have been independently verified here**, so no V2-vs-V3 delta is claimed. Executable V3 uses 4×3 tiling despite a stale earlier code-cell comment mentioning 3×2. The final test is source-separated; there is no guaranteed field-site-disjoint sample.

Model checkpoint is a Torch dictionary including `model` state, `classes`, `architecture`, `image_size`, `sources`, `best_epoch` and validation score. It is not in Git because `*.pt` is ignored. Notebook outputs may be obtained separately and validated against the recorded checksum. Save results and any changed decisions under `reports/` with provenance.

See [evaluation](evaluation.md), [methodology](methodology.md) and [reproducibility](reproducibility.md).

---

**Evidence:** [`experiment_config.json`](../../reports/experiment_config.json), [`evaluation_by_source.json`](../../reports/evaluation_by_source.json), [`dataset_provenance.json`](../../reports/dataset_provenance.json), [`notebook`](../../notebooks/weedspot.ipynb).
