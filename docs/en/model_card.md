# Model card — WeedSpot V3

> WeedSpot Day 35 V3 | Evidence reviewed 2026-11-13. [Index](README.md) | [Root](../../README.md)

**Identity:** WeedSpot V3 Compact U-Net, three-class semantic segmentation, base width 24, 384×384 RGB, Torch weights `models/best.pt` (locally provisioned). **Intended:** human-reviewed research screening of crop and weed regions. **Not intended:** commercial use without license review, autonomous spraying, calibrated probability, acreage, crop species identification or safety-critical decisions.

**Training data:** 60 CWFID and 88 EWIS1 paired originals, 4×3 tiling for the aerial source and original-level grouping before split. **Output:** class logits `N×3×384×384`, argmax class IDs `0=Background,1=Crop,2=Weed`; postprocessed mask/overlay resized to uploaded image dimensions.

**Selection:** epoch 32, validation foreground mIoU 0.5772. **Held-out:** CWFID foreground mIoU 0.5431, Weed IoU 0.3410; EWIS1 foreground mIoU 0.5231, Weed IoU 0.3985. Small original-image test counts and uncertain new-field independence limit interpretation. Confidence is mean softmax maximum, not calibrated.

**Integrity:** SHA-256 `6380680aa33892dcdbe8b531d3642dca17434f2436717673fa6773fa07c22e7a` from `reports/experiment_config.json`. The loader verifies architecture, class order, image size, state dict and hash. **Safety:** treat output as visual aid; require a field-validated human workflow; evaluate new domains, small weeds and ambiguous boundaries before practical decisions. See `reports/MODEL_CARD.md` as earlier record and [evaluation](evaluation.md).

---

**Evidence:** [`experiment_config.json`](../../reports/experiment_config.json), [`evaluation_by_source.json`](../../reports/evaluation_by_source.json), [`dataset_provenance.json`](../../reports/dataset_provenance.json), [`notebook`](../../notebooks/weedspot.ipynb).
