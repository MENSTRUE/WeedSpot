# Reproducibility and artifact integrity

> WeedSpot Day 35 V3 | Evidence reviewed 2026-11-13. [Index](README.md) | [Root](../../README.md)

**Sources:** notebook `notebooks/weedspot.ipynb`, CWFID and EWIS1 original datasets, archived experiment reports, image/mask grouping manifest and Python requirements. Notebook Kaggle source uses dataset directory `/kaggle/input/datasets/wafabila/weedspot-dataset`, with seed 42 and GPU T4 described in its header. Download/copy raw data only under authorized terms; leave raw datasets out of version control.

Recreate the recorded split and 4×3 EWIS1 tiling before training; fit `UNet(n=24)` with the notebook's loader/optimizer/loss/validation loop. Select best checkpoint by validation foreground macro IoU (not test). Export `models/best.pt` plus reports, then compute `Get-FileHash .\models\best.pt -Algorithm SHA256`. Expected hash: `6380680aa33892dcdbe8b531d3642dca17434f2436717673fa6773fa07c22e7a`; a newly retrained model **will normally have a different hash** and must not be misrepresented as the exact V3 artifact.

Local application requires PyTorch plus `backend/requirements.txt`, `npm ci` under frontend, and the local checkpoint. The backend loads weights with `weights_only=True` and exact `state_dict`. For testing and readiness:

```powershell
$Python = 'C:\DevEnvs\ai-general\Scripts\python.exe'
cd 'D:\porto\100 day\day 35\backend'
& $Python -m pytest -q
Invoke-RestMethod http://127.0.0.1:8000/api/v1/ready | ConvertTo-Json -Depth 5
# From a new terminal:
cd 'D:\porto\100 day\day 35\frontend'
npm run build
```
Expected `ready.model_ready=true` and `checkpoint_sha256_matches=true` only after the correct local checkpoint is loaded. The three tracked API tests check health, readiness contract, and rejection of invalid media type; **they do not test image segmentation quality or complete frontend-to-backend E2E**.

**Reproduction boundary:** The repository tracks notebook and research CSV/JSON but *not* source images nor the original checkpoint. The exact experiment cannot be reproduced from Git clone alone. The existing notebook contains a stale 3×2 comment; actual V3 loop uses `nx,ny=(4,3)`. Preserve raw logs and record new hardware, package versions, training time and any deviation before publishing a new result.

---

**Evidence:** [`experiment_config.json`](../../reports/experiment_config.json), [`evaluation_by_source.json`](../../reports/evaluation_by_source.json), [`dataset_provenance.json`](../../reports/dataset_provenance.json), [`notebook`](../../notebooks/weedspot.ipynb).
