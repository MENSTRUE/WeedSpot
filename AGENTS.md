# AGENTS.md — WeedSpot agent operating contract

**Scope:** Entire `MENSTRUE/WeedSpot` repository. Source-of-truth priority: (1) executable backend/frontend/notebook code; (2) recorded raw experiment JSON/CSV and original source links; (3) local runtime checks; (4) current documentation; (5) proposals. Read the code before altering claims. Current phase: **working local research prototype / validation and hardening**, not production deployment.

## Invariants

- Keep `README.md`, `AGENTS.md`, `LICENSE`, `.gitignore`, `.env.example`, `notebooks/`, `models/`, `reports/`, `assets/{plots,examples,screenshots,diagrams}/`, `backend/`, `frontend/`, `docs/`, and `scripts/`.
- No tracked `datasets/`; no raw images, credentials, archives, generated caches or model binaries in regular Git. Do not rewrite git history or silently remove user work.
- Never retrain, overwrite or fabricate `models/best.pt` while doing documentation work. Checkpoint is absent from Git by design.
- For root documents use English-first; maintain **equivalent-depth** `docs/en` and `docs/id` coverage. Component READMEs explain actual code, not aspirational claims.

## Verified before / now / next

**Before:** CWFID 60 + EWIS1 88 paired source images, mask audits, grouping/splits, V3 U-Net experiment and CSV/JSON evaluation. **Now:** FastAPI with strict checkpoint SHA-256 check, React+Vite frontend, local upload and segmentation demonstrated; 3 API contract tests and frontend production build have run successfully in user-provided Windows logs. **Next:** local checksum reproduction and quantitative comparison, inference tiling parity, independent field evaluation, end-to-end tests, licensed distribution review, production threat model.

## Dataset and ML rules

- Ground sources in `reports/dataset_provenance.json` and original provider terms. CWFID is noncommercial research; do not imply MIT license covers dataset content. EWIS1 license must be separately verified.
- Class IDs: 0 Background, 1 Crop, 2 Weed. Decode CWFID masks as black/red/green; EWIS1 as transparent/blue/orange. Never combine raw masks without mapping.
- Group split BEFORE any EWIS1 tiling. `nx,ny=(4,3)` in V3 training executable; twelve tiles per original, never cross train/val/test parents. 60 CWFID and 88 EWIS1 **originals** are different from 1,116 processed image samples.
- Report CWFID/EWIS1 results separately. Best validation foreground IoU 0.5772258034471679, epoch 32; no tuning on the held-out test. Be explicit about source-site independence and limited test size.
- Check checkpoint SHA-256 against `reports/experiment_config.json`; use `weights_only=True`, `strict=True`, architecture `UNet(n=24)`, image size 384 and exact ordered classes. Never bypass SHA verification to make a demo succeed.
- Validate input preprocessing: EXIF transpose, RGB, bilinear RGB resize to 384², `/255`; output argmax and nearest-neighbor resize to original image. Current API does NOT tile whole inference images, which may degrade high-res aerial imagery.
- Distinguish softmax mean from calibrated reliability, pixel coverage from physical land area, qualitative inference success from measured accuracy. No fabricated examples or metrics.

## Backend development rules

- Existing REST endpoints: `GET /api/v1/health`, `GET /api/v1/ready`, `POST /api/v1/predict` with multipart field `file`. Do not change contracts silently. Maintain 10 MiB and 16 MP limits and reject unsupported MIME/broken files.
- `/health` is reachability; readiness is a different contract. Missing/mismatched weights must not silently fall back to random model.
- Keep error messages informative but avoid user-visible stack traces, credentials and filesystem disclosures in public deployments. Use automated tests and confirm negative cases.
- Concurrency: preserve model inference lock unless profiling and tests justify a replacement. Do not infer production throughput from single local runs.
- CORS currently permits local Vite origins only; public deployment requires a security review, auth and rate limiting.

## Frontend development rules

- React 19, TypeScript and Vite 6 UI; blue-gray style and accessible upload/interaction. Preserve state handling for chosen file, prediction, loading, errors, compare slider, overlay/mask/original and download.
- Never display stale prediction from a prior image after selection changes. Disable Analyze if the model is unavailable. Keep PNG/JPEG/WebP and 10 MiB front-end validation in sync with backend.
- Use `/api` via Vite development proxy; do not hardcode a public backend URL or expose secrets. Build with `npm ci && npm run build`; test user flows as well as compilation.

## Documentation, evidence and review checklist

- Main README is navigational; detailed paired docs live at `docs/en/*.md` and `docs/id/*.md`.
- Existing real assets only: `assets/plots/training_results.png`, `assets/examples/{CWFID_test_examples,EWIS1_test_examples,both_datasets_label_audit}.png`. No committed screenshots at last audit. Link via relative Markdown paths and label qualitative examples honestly.
- When changing code, update architecture, model card, limits, API contract and docs in BOTH languages where relevant. Preserve provenance, report originals and licenses.
- Before commit: run `python -m pytest -q` in backend, `npm run build` in frontend, verify model-ready/hash and at least one actual image response when possible; check links and `git diff --check`.
- Commits should be scoped (`docs:`, `fix:`, `feat:`). Review `git status` before staging; never commit `.env`, raw data, checkpoint, node_modules, dist or API tokens.
- **Definition of Done:** implementation runs, error handling/tests relevant to change pass, metrics are sourced, docs synchronized, provenance recorded, safety limits clear, and no broken references. Unverified items must be labeled unverified rather than marked done.

## Prohibited actions

No fictional precision metrics, hidden test-set tuning, unreviewed dataset redistribution, autop-run training or replacement checkpoints, public herbicide-control claims, silent interface breaks, blanket `git add -f`, or changes to model/weights as part of a documentation-only task. See `docs/en/limitations.md` and `docs/id/limitations.md` for safety constraints.
