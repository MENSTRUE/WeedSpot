# Documentation QA report — WeedSpot (2026-11-13)

- GitHub source: `https://github.com/MENSTRUE/WeedSpot`, branch `main`, commit `f729b3d2` at inspection; current remote may move later.
- Files in this documentation overlay: **34** Markdown documents; **4 existing docs** are replaced with updated versions, all other paths are additive.
- Internal relative Markdown image/file link check: **PASS** for 189 links (resolution against overlay and known GitHub tracked artifacts).
- English/Indonesian paired deep documents: **10 subjects × 2 languages**; both indexes included.
- Code, checkpoint, data and tracked JSON/CSV originals are intentionally **not modified**.
- Research metrics copied from `reports/evaluation_by_source.json` / `reports/experiment_config.json`, and test count constraints from `reports/split_quality.json`.
- Source inconsistency found: `reports/README.md` says EWIS1 3×2 but actual V3 code uses 4×3; documentation overlay corrects text without editing notebook training logic.
- Stale configuration: `.env.example` advertises ONNX and 8012, but actual API expects Torch `models/best.pt` and port 8000. Documentation flags this; `.env.example` was not modified to respect documentation-only scope.
- Deployment still local-only; frontend runtime and model inference observed from user screenshot; no independent benchmark or cloud test performed here.
- `models/best.pt` missing from tracked GitHub tree due to `*.pt` ignore; original weight integrity and exact checkpoint must be checked locally.
- No committed website screenshot; existing research plots and examples are linked. These are not fabricated.
- No public rights claim for EWIS1; CWFID restrictive noncommercial research use.
- Validation scope: Markdown relative links checked using tracked tree; external web URLs and command execution not tested in this sandbox; local environment-specific scripts are described as such.
