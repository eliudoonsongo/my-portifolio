$localTemp = Join-Path $env:LOCALAPPDATA "Temp\lighthouse_tmp"
New-Item -ItemType Directory -Force -Path $localTemp | Out-Null
$env:TEMP = $localTemp
$env:TMP = $env:TEMP
Write-Output "Using TEMP=$env:TEMP"
npx -y lighthouse http://localhost:8000 --only-categories=pwa --output=json --output-path=lighthouse-pwa.json --chrome-flags="--headless --no-sandbox"
