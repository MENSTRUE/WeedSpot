# Indeks dokumentasi

Bukti engineering dan penelitian lengkap beserta keterbatasannya; jangan menganggap rencana sebagai fitur yang sudah selesai.

[Main README](../../README.md) | [Other language](../en/README.md)

- [Asal-usul dataset dan lisensi](dataset_provenance.md)
- [Metodologi penelitian](methodology.md)
- [Desain eksperimen dan jejak percobaan](experiments.md)
- [Kartu model — WeedSpot V3](model_card.md)
- [Evaluasi dan ketidakpastian](evaluation.md)
- [Batasan dan penggunaan bertanggung jawab](limitations.md)
- [Arsitektur sistem dan kontrak API](architecture.md)
- [Reproduksibilitas dan integritas artefak](reproducibility.md)
- [Deployment lokal dan kesiapan keamanan](deployment.md)
- [Penanganan masalah dan diagnosis](troubleshooting.md)

## Evidence hierarchy

1. Executed source: `backend/app`, `frontend/src`, `notebooks/weedspot.ipynb`.
2. Source data and metrics: `reports/*.json`, `reports/*.csv`.
3. User-run local validation: 3 passed backend tests, Vite build, successful visualization screenshot.
4. Proposals and roadmap are not evidence of completion.

The GitHub repo does not contain the model binary due to `.gitignore`. Verify locally before claiming a portable ready-to-run clone.
