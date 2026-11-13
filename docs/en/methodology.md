# Research methodology

> WeedSpot Day 35 V3 | Evidence reviewed 2026-11-13. [Index](README.md) | [Root](../../README.md)

The pipeline: (1) source discovery; (2) paired-image and palette verification; (3) hash/group inspection; (4) train/validation/test allocation per CWFID block and EWIS1 whole location-date session **before** tiling; (5) 4×3 EWIS1 tiles; (6) 384² bilinear RGB and nearest mask; (7) training-only flips, 90° rotations and brightness variation; (8) source-balanced/weed-aware sampling; (9) U-Net supervised loss; (10) validation-only checkpoint selection; (11) held-out source-specific IoU and parent-bootstrap uncertainty.

`UNet(n=24)` uses blocks of Conv2d–BatchNorm–ReLU repeated twice, encoder widths 24/48/96 and bottleneck 192, bilinear skip-connected decoder, and three-channel per-pixel output. The notebook uses AdamW, cosine LR scheduling, clipping and weighted CE `[0.15,1.0,3.0]` plus `0.7 ×` foreground Dice. Ignore-index 255 remains excluded. The output classes are Background / Crop / Weed.

**Inference/train mismatch:** training EWIS1 consists of 12 384px tiles per original, whereas the current FastAPI pipeline resizes an entire uploaded photo directly to 384². Aerial and high-resolution detail may disappear; solve with documented and validated tiled inference rather than asserting parity. Full experiment: [`notebooks/weedspot.ipynb`](../../notebooks/weedspot.ipynb).

---

**Evidence:** [`experiment_config.json`](../../reports/experiment_config.json), [`evaluation_by_source.json`](../../reports/evaluation_by_source.json), [`dataset_provenance.json`](../../reports/dataset_provenance.json), [`notebook`](../../notebooks/weedspot.ipynb).
