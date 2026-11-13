$ErrorActionPreference = 'Stop'
$Repo = Split-Path -Parent $PSScriptRoot
$Python = 'C:\DevEnvs\ai-general\Scripts\python.exe'
if (-not (Test-Path $Python)) { throw "Missing Python: $Python" }
Set-Location (Join-Path $Repo 'backend')
& $Python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
