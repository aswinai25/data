# Sales Analytics Application - Windows PowerShell Startup Script
# This script automates the setup and startup of the application

Write-Host "`n" -ForegroundColor Green
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         Sales Analytics Application - Startup Helper           ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor Green

# Get the directory where this script is located
$scriptDir = Split-Path -Parent -Path $MyInvocation.MyCommand.Definition
Write-Host "Current directory: $scriptDir"
Write-Host "`n"

# Check if Python is installed
Write-Host "Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python 3.8+ from https://www.python.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit
}

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js 16+ from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit
}

Write-Host "`nStarting the application..." -ForegroundColor Green
Write-Host "`n"

# Function to start backend
function Start-Backend {
    $backendDir = Join-Path -Path $scriptDir -ChildPath "backend"
    
    Write-Host "[1/2] Starting Backend Server..." -ForegroundColor Cyan
    
    $scriptContent = @"
    Set-Location '$backendDir'
    
    # Create virtual environment if it doesn't exist
    if (-not (Test-Path 'venv')) {
        Write-Host "Creating Python virtual environment..." -ForegroundColor Yellow
        python -m venv venv
    }
    
    # Activate virtual environment
    & '.\venv\Scripts\Activate.ps1'
    
    # Install dependencies
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    pip install -r requirements.txt --quiet
    
    # Start the server
    Write-Host "Starting FastAPI server..." -ForegroundColor Green
    python main.py
"@
    
    $scriptBlock = [scriptblock]::Create($scriptContent)
    Start-Process pwsh -ArgumentList "-NoExit", "-Command", $scriptBlock
}

# Function to start frontend
function Start-Frontend {
    $frontendDir = Join-Path -Path $scriptDir -ChildPath "frontend"
    
    Write-Host "[2/2] Starting Frontend Server..." -ForegroundColor Cyan
    
    $scriptContent = @"
    Set-Location '$frontendDir'
    
    # Install dependencies if needed
    if (-not (Test-Path 'node_modules')) {
        Write-Host "Installing dependencies..." -ForegroundColor Yellow
        npm install
    }
    
    # Start development server
    Write-Host "Starting Vite development server..." -ForegroundColor Green
    npm run dev
"@
    
    $scriptBlock = [scriptblock]::Create($scriptContent)
    Start-Process pwsh -ArgumentList "-NoExit", "-Command", $scriptBlock
}

# Start both servers
Start-Backend
Start-Sleep -Seconds 3
Start-Frontend

Write-Host "`n" -ForegroundColor Green
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  Both servers are starting in separate windows...              ║" -ForegroundColor Cyan
Write-Host "║                                                                ║" -ForegroundColor Cyan
Write-Host "║  Backend:   http://localhost:8000                            ║" -ForegroundColor Green
Write-Host "║  API Docs:  http://localhost:8000/docs                       ║" -ForegroundColor Green
Write-Host "║  Frontend:  http://localhost:3000                            ║" -ForegroundColor Green
Write-Host "║                                                                ║" -ForegroundColor Cyan
Write-Host "║  Open your browser and navigate to:                          ║" -ForegroundColor Cyan
Write-Host "║  http://localhost:3000                                       ║" -ForegroundColor Green
Write-Host "║                                                                ║" -ForegroundColor Cyan
Write-Host "║  The terminal windows will stay open and show server logs.    ║" -ForegroundColor Cyan
Write-Host "║  DO NOT CLOSE them while using the application.              ║" -ForegroundColor Red
Write-Host "║                                                                ║" -ForegroundColor Cyan
Write-Host "║  To stop: Close both terminal windows or press Ctrl+C        ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor Green

Read-Host "Startup complete! Press Enter to continue"
