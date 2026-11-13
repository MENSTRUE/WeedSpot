# Limitations and responsible use

> WeedSpot Day 35 V3 | Evidence reviewed 2026-11-13. [Index](README.md) | [Root](../../README.md)

**Research:** tiny test partitions, high intra-image spatial correlation of tiles, incomplete site labels, CWFID filename-block grouping heuristic, EWIS1 sessions disjoint by date/location but possibly revisiting the same field, cross-domain visual shift. Exact SHA duplicate checks do not establish absence of near-duplicates. Crop/weed masks may have ambiguous boundaries.

**Model:** false negatives for small weeds after resize, crop/weed confusion, a single whole-image 384² inference path despite tiled aerial training, uncalibrated mean maximum softmax confidence, no species distinction or pixel-to-meter calibration. No guarantee for new farms, lighting/weather, or drone altitude.

**Engineering:** local dev FastAPI/Vite only; no user identity, auth, quota/rate limiting, production file scanning, comprehensive E2E regression, monitoring or public hosting proof. Source images not intentionally saved by the app, but a privacy/security audit is needed before public use.

**Permissions:** MIT project code does not grant rights to restricted CWFID imagery; EWIS1 licensing requires publisher check. Do not redistribute third-party datasets or presume commercial authorization. No autonomous herbicide application or robotic actuation without independent efficacy, safety and legal review.

**Prioritized mitigation:** (1) new field/site holdout with acquisition metadata, (2) high-resolution tiled inference and unit-tested aggregation, (3) per-class error review and probability calibration, (4) licensing validation, (5) auth/threat-model and deployment hardening.

---

**Evidence:** [`experiment_config.json`](../../reports/experiment_config.json), [`evaluation_by_source.json`](../../reports/evaluation_by_source.json), [`dataset_provenance.json`](../../reports/dataset_provenance.json), [`notebook`](../../notebooks/weedspot.ipynb).
