@echo off
echo ==================================================
echo MANOX Deployment Verification Script
echo ==================================================
echo This script will verify that your MANOX deployment
echo is properly configured before deploying to Vercel and Render.
echo.

REM Check if we're in the right directory
if not exist "frontend" (
    echo Error: frontend directory not found!
    echo Please run this script from the root of your MANOX project.
    echo.
    pause
    exit /b 1
)

if not exist "backend" (
    echo Error: backend directory not found!
    echo Please run this script from the root of your MANOX project.
    echo.
    pause
    exit /b 1
)

echo Running deployment verification...
echo.

REM Run the verification script
node deployment-verification.js

echo.
echo ==================================================
echo Verification complete.
echo ==================================================
echo.

pause