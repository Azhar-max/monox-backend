# PowerShell script to prepare MANOX backend for Render deployment
Write-Host "=========================================" -ForegroundColor Green
Write-Host "MANOX Backend Preparation for Render" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "backend")) {
    Write-Host "Error: backend directory not found!" -ForegroundColor Red
    Write-Host "Please run this script from the root of your MANOX project." -ForegroundColor Red
    Write-Host ""
    exit 1
}

# Change to backend directory
Write-Host "Changing to backend directory..." -ForegroundColor Yellow
Set-Location backend

# Check if package.json exists
if (-not (Test-Path "package.json")) {
    Write-Host "Error: package.json not found in backend directory!" -ForegroundColor Red
    Set-Location ..
    exit 1
}

# Install dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to install backend dependencies!" -ForegroundColor Red
    Set-Location ..
    exit 1
}

# Test if the server can start
Write-Host "Testing server startup..." -ForegroundColor Yellow
Write-Host "This will run for 5 seconds and then stop." -ForegroundColor Cyan
Write-Host ""

# Start the server in background for 5 seconds
Start-Process -NoNewWindow "npm" -ArgumentList "start"
Start-Sleep -Seconds 5

# Return to root directory
Set-Location ..

Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host "Backend preparation completed!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Deploy your backend to Render through the web interface:" -ForegroundColor Yellow
Write-Host "   - Go to https://render.com" -ForegroundColor Yellow
Write-Host "   - Create a new Web Service" -ForegroundColor Yellow
Write-Host "   - Connect your GitHub repository" -ForegroundColor Yellow
Write-Host "   - Set Root Directory to 'backend'" -ForegroundColor Yellow
Write-Host "   - Set Build Command to 'npm install'" -ForegroundColor Yellow
Write-Host "   - Set Start Command to 'npm start'" -ForegroundColor Yellow
Write-Host "   - Add environment variables:" -ForegroundColor Yellow
Write-Host "     * MONGO_URI = your MongoDB connection string" -ForegroundColor Yellow
Write-Host "     * JWT_SECRET = your JWT secret key" -ForegroundColor Yellow
Write-Host "     * FRONTEND_URL = your Vercel URL (to be updated later)" -ForegroundColor Yellow
Write-Host "     * PORT = 10000" -ForegroundColor Yellow
Write-Host ""