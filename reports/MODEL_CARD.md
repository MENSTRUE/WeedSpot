# WeedSpot Day35 V3 FINAL · Model Card

- Architecture: custom U-Net(n=24), semantic segmentation for Background / Crop / Weed.
- Supervised sources: CWFID 60 original paired RGB + crop/weed annotation; EWIS1 88 original aerial RGB + crop/weed segmentation mask.
- Domain and palette mapping: verified separately per source (see reports/mask_audit.json).
- EWIS: 4x3 tiled from original image, downsampled to 384px; potential tiny-weed detail loss.
- Champion: epoch 32, validation foreground mIoU 0.5772.
- Separate held-out source performance: reports/evaluation_by_source.json.
- Session-disjoint EWIS1 split and source-disjoint parent tiles; unseen-site leakage is NOT disproved.
- Do NOT use to guide autonomous herbicide spraying without field validation and safety review.
- CWFID noncommercial research restriction; do not redistribute raw images.
- Torch checkpoint only; mobile runtimes require conversion and parity validation.
