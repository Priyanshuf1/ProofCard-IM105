@echo off
title ProofCard Launcher - Deviathon IM-105
echo ===================================================
echo   Starting ProofCard - IM-105 Verification Platform
echo ===================================================
echo.

cd /d "%~dp0"
set PYTHONPATH=%~dp0

echo Starting Backend on http://127.0.0.1:8000 ...
start "ProofCard Backend (FastAPI)" cmd /k "cd /d %~dp0 && set PYTHONPATH=%~dp0 && python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload"

echo Starting Frontend on http://localhost:5173 ...
start "ProofCard Frontend (Vite)" cmd /k "cd /d %~dp0web && npm run dev"

echo.
echo Both servers are launching in dedicated standalone windows!
echo - Backend API:  http://127.0.0.1:8000/docs
echo - Frontend Web: http://localhost:5173/
echo.
pause
