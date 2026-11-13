$ErrorActionPreference = 'Stop'
$Repo = Split-Path -Parent $PSScriptRoot
Set-Location (Join-Path $Repo 'frontend')
npm run dev
