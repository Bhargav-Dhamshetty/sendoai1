@echo off
echo ================================
echo   TESTING SENDORA AI SERVER
echo ================================
echo.
echo Waiting for server to be ready...
timeout /t 3 /nobreak > nul
echo.
node quick-test.js
echo.
pause
