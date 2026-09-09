$gitPath = "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe"
if (Test-Path $gitPath) {
    & $gitPath push -u origin main
} else {
    git push -u origin main
}
