# Documentation index

Full engineering and research evidence, with source-derived limits; do not treat intended future work as completed.

[Main README](../../README.md) | [Other language](../id/README.md)

- [Dataset provenance and licensing](dataset_provenance.md)
- [Research methodology](methodology.md)
- [Experiment design and lineage](experiments.md)
- [Model card — WeedSpot V3](model_card.md)
- [Evaluation and uncertainty](evaluation.md)
- [Limitations and responsible use](limitations.md)
- [System architecture and API contract](architecture.md)
- [Reproducibility and artifact integrity](reproducibility.md)
- [Local deployment and security readiness](deployment.md)
- [Troubleshooting and diagnosis](troubleshooting.md)

## Evidence hierarchy

1. Executed source: `backend/app`, `frontend/src`, `notebooks/weedspot.ipynb`.
2. Source data and metrics: `reports/*.json`, `reports/*.csv`.
3. User-run local validation: 3 passed backend tests, Vite build, successful visualization screenshot.
4. Proposals and roadmap are not evidence of completion.

The GitHub repo does not contain the model binary due to `.gitignore`. Verify locally before claiming a portable ready-to-run clone.
