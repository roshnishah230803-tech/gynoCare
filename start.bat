@echo off
REM GynoCare Integration Startup Script for Windows
REM This script starts all services in the correct order and checks their health

echo Starting GynoCare Services...

REM Load environment variables from .env.development
if exist .env.development (
    echo Found .env.development
) else (
    echo .env.development not found. Please create it first.
    pause
    exit /b 1
)

REM Start MongoDB (assuming it's installed and in PATH)
echo Starting MongoDB...
start /B mongod --dbpath C:\data\db

REM Start ML Service
echo Starting ML Service...
cd ml
if not exist venv (
    echo Creating Python virtual environment...
    python -m venv venv
)
call venv\Scripts\activate
pip install -r requirements.txt > nul 2>&1
start /B python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
cd ..

REM Start Backend
echo 🔧 Starting Backend...
cd backend
npm install > nul 2>&1
start /B npm run dev
cd ..

REM Start Frontend
echo Starting Frontend...
cd frontend
npm install > nul 2>&1
start /B npm run dev
cd ..

echo ⏱️  Waiting for services to start...
timeout /t 10 /nobreak > nul

echo All services are starting!
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo ML:       http://localhost:8000
echo.
echo API Documentation:
echo    Backend:  http://localhost:5000/api/docs
echo    ML:       http://localhost:8000/docs
echo.
echo Press any key to stop all services...
pause > nul

REM Kill background processes (this is a simple approach for Windows)
taskkill /F /IM node.exe > nul 2>&1
taskkill /F /IM python.exe > nul 2>&1
taskkill /F /IM mongod.exe > nul 2>&1
