# Frontend coding agent rules

Follow [root AGENTS.md](../AGENTS.md). Frontend-specific invariants:

1. Use React+TypeScript with Vite; preserve the blue-gray visual identity and existing image studio state machine unless redesign is requested.
2. Keep `GET /api/v1/ready` and multipart `POST /api/v1/predict` integration consistent with backend; Vite proxy `/api` is dev-only.
3. Never allow stale segmentation from a previous upload. Preserve validation for JPEG/PNG/WebP and ≤10 MiB; backend also checks ≤16 MP.
4. Disable analysis when readiness is false and expose actionable error feedback for HTTP failures.
5. Compare slider, mask/original/overlay tabs and result download must remain functional and keyboard accessible.
6. Before commit run `npm ci && npm run build`, manually test a real input, and update equivalent English/Indonesian documentation.
7. No invented agronomic coverage, calibrated confidence, deployment claims or production storage guarantees.
