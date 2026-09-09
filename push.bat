@echo off
set "GIT_PATH=%LOCALAPPDATA%\Programs\Git\cmd\git.exe"
if exist "%GIT_PATH%" (
    "%GIT_PATH%" add .
    "%GIT_PATH%" commit -m "update: sync changes to NIRAIVU"
    "%GIT_PATH%" push origin main
) else (
    git add .
    git commit -m "update: sync changes to NIRAIVU"
    git push origin main
)
pause
