@echo off
REM Sales Analytics Application - Windows Batch Startup Script
REM This script automates the setup and startup of the application

setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║         Sales Analytics Application - Startup Helper           ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Get the directory where this script is located
set SCRIPT_DIR=%~dp0

echo Current directory: %SCRIPT_DIR%
echo.

REM Check if Python is installed
echo Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org/
    pause
    exit /b 1
)

REM Check if Node.js is installed
echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 16+ from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Python found
echo ✓ Node.js found
echo.

echo Starting the application in two new windows...
echo.

REM Start Backend
echo [1/2] Starting Backend Server...
start "Sales Analytics Backend" cmd /k "cd /d "%SCRIPT_DIR%backend" && python -m venv venv && call venv\Scripts\activate && pip install -r requirements.txt && python main.py"

REM Wait a moment for backend to start
timeout /t 3 /nobreak

REM Start Frontend  
echo [2/2] Starting Frontend Server...
start "Sales Analytics Frontend" cmd /k "cd /d "%SCRIPT_DIR%frontend" && npm install && npm run dev"

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║  Both servers are starting in separate windows...              ║
echo ║                                                                ║
echo ║  Backend:   http://localhost:8000                            ║
echo ║  API Docs:  http://localhost:8000/docs                       ║
echo ║  Frontend:  http://localhost:3000                            ║
echo ║                                                                ║
echo ║  Open your browser and navigate to:                          ║
echo ║  http://localhost:3000                                       ║
echo ║                                                                ║
echo ║  The terminal windows will stay open and show server logs.    ║
echo ║  DO NOT CLOSE them while using the application.              ║
echo ║                                                                ║
echo ║  To stop: Close both terminal windows or press Ctrl+C        ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

pause
