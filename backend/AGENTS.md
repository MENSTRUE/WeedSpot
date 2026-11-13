# Backend coding agent rules

Follow [root AGENTS.md](../AGENTS.md) first. This file adds backend-specific constraints.

1. Keep FastAPI routes `/api/v1/health`, `/api/v1/ready`, `/api/v1/predict` and multipart field `file` stable unless explicitly versioned.
2. Preserve `models/best.pt` SHA-256, `UNet(n=24)`, ordered classes and 384 image contract; **never disable verification**.
3. Limit requests to 10 MiB and 16 MP; validate MIME and actual decoding; expose no traceback to clients.
4. Respect original EXIF orientation and RGB normalization, and use nearest interpolation for class masks; no silent training/inference pipeline changes.
5. `GET /health` indicates process reachability only; `/ready` is authoritative for inference availability.
6. Maintain/expand pytest positive/negative cases, including actual real-checkpoint predictions when safely available. Avoid test-driven fake metrics.
7. Maintain loopback-only settings until auth, TLS, rate limits and privacy measures are specified. Update both bilingual architecture documents after API changes.
