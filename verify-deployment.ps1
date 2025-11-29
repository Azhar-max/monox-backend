# MANOX Deployment Verification Script (PowerShell)
Write-Host "==================================================" -ForegroundColor Blue
Write-Host "MANOX Deployment Verification Script" -ForegroundColor Blue
Write-Host "==================================================" -ForegroundColor Blue
Write-Host "This script will verify that your MANOX deployment"
Write-Host "is properly configured before deploying to Vercel and Render."
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "frontend")) {
    Write-Host "Error: frontend directory not found!" -ForegroundColor Red
    Write-Host "Please run this script from the root of your MANOX project." -ForegroundColor Red
    Write-Host ""
    pause
    exit 1
}

if (-not (Test-Path "backend")) {
    Write-Host "Error: backend directory not found!" -ForegroundColor Red
    Write-Host "Please run this script from the root of your MANOX project." -ForegroundColor Red
    Write-Host ""
    pause
    exit 1
}

Write-Host "Running deployment verification..." -ForegroundColor Blue
Write-Host ""

# Run the verification script
node deployment-verification.js

Write-Host ""
Write-Host "==================================================" -ForegroundColor Blue
Write-Host "Verification complete." -ForegroundColor Blue
Write-Host "==================================================" -ForegroundColor Blue
Write-Host ""

pause