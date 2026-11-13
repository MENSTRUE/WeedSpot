# Model registry and checkpoint handling

**Checkpoint path expected by code:** `models/best.pt`. **Not tracked in Git** (`*.pt` ignored) and therefore unavailable after a plain clone. Store it only after obtaining the authorized experiment output and verifying SHA-256.

| Contract | Value / evidence |
|---|---|
| Experiment | WeedSpot Day35 V3 FINAL, `reports/experiment_config.json` |
| Architecture | custom U-Net `n=24` (`backend/app/model.py`) |
| Input | RGB `N×3×384×384`, float32 scaled to [0,1] |
| Output | `N×3×384×384` logits; Background/Crop/Weed IDs 0/1/2 |
| Display | postprocessed mask/overlay at original upload size |
| Champion | epoch 32, validation foreground mIoU 0.5772258034 |
| SHA-256 | `6380680aa33892dcdbe8b531d3642dca17434f2436717673fa6773fa07c22e7a` |

```powershell
cd 'D:\porto\100 day\day 35'
Get-FileHash .\models\best.pt -Algorithm SHA256
Invoke-RestMethod http://127.0.0.1:8000/api/v1/ready | ConvertTo-Json -Depth 5
```

The loader requires Torch dictionary `model`, `architecture=UNet(n=24)`, `classes=[Background,Crop,Weed]`, `image_size=384`. A different hash is not interchangeable and triggers readiness failure; **do not overwrite configuration hash to suppress the error**. For model risks, review [`docs/en/model_card.md`](../docs/en/model_card.md), [`docs/id/model_card.md`](../docs/id/model_card.md). The binary may be subject to underlying training-data usage terms.
