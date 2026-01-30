$dirs = Get-ChildItem -Path $env:TEMP -Filter 'lighthouse*' -Directory -ErrorAction SilentlyContinue
if ($dirs) {
    foreach ($d in $dirs) {
        Write-Output "Removing: $($d.FullName)"
        try { Remove-Item -LiteralPath $d.FullName -Recurse -Force -ErrorAction SilentlyContinue }
        catch { Write-Output "Failed to remove: $($_.Exception.Message)" }
    }
} else {
    Write-Output "No lighthouse temp dirs found."
}
