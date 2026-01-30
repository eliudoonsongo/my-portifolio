$env:TEMP = 'C:\Users\EliudOnsongo\OneDrive\Desktop\my-portifolio\.lighthouse_tmp'
$env:TMP = $env:TEMP
Write-Output "Using TEMP=$env:TEMP"
npx -y lighthouse http://localhost:8000 --only-categories=pwa --output=json --output-path=lighthouse-pwa.json --chrome-flags="--headless --no-sandbox"
