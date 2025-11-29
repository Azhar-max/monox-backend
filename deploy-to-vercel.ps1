# PowerShell script to deploy MANOX frontend to Vercel
Write-Host "=========================================" -ForegroundColor Green
Write-Host "MANOX Frontend Deployment to Vercel" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "frontend")) {
    Write-Host "Error: frontend directory not found!" -ForegroundColor Red
    Write-Host "Please run this script from the root of your MANOX project." -ForegroundColor Red
    Write-Host ""
    exit 1
}

# Change to frontend directory
Write-Host "Changing to frontend directory..." -ForegroundColor Yellow
Set-Location frontend

# Check if package.json exists
if (-not (Test-Path "package.json")) {
    Write-Host "Error: package.json not found in frontend directory!" -ForegroundColor Red
    Set-Location ..
    exit 1
}

# Install dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to install frontend dependencies!" -ForegroundColor Red
    Set-Location ..
    exit 1
}

# Build the project
Write-Host "Building frontend project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to build frontend project!" -ForegroundColor Red
    Set-Location ..
    exit 1
}

# Deploy to Vercel
Write-Host "Deploying to Vercel..." -ForegroundColor Yellow
Write-Host "You will need to log in to your Vercel account if not already logged in." -ForegroundColor Cyan
Write-Host ""

vercel --prod
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to deploy to Vercel!" -ForegroundColor Red
    Set-Location ..
    exit 1
}

# Return to root directory
Set-Location ..

Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host "Frontend deployment completed successfully!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Note your Vercel deployment URL" -ForegroundColor Yellow
Write-Host "2. Deploy your backend to Render through the web interface" -ForegroundColor Yellow
Write-Host "3. Update environment variables in both services" -ForegroundColor Yellow
Write-Host ""