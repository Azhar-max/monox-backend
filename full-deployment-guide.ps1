# Full Deployment Guide for MANOX
Write-Host "=========================================" -ForegroundColor Green
Write-Host "MANOX Full Deployment Guide" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""

Write-Host "This script will guide you through the deployment process for MANOX." -ForegroundColor Cyan
Write-Host "The deployment consists of two parts:" -ForegroundColor Cyan
Write-Host "1. Frontend deployment to Vercel" -ForegroundColor Cyan
Write-Host "2. Backend deployment to Render" -ForegroundColor Cyan
Write-Host ""

Write-Host "Prerequisites:" -ForegroundColor Yellow
Write-Host "- GitHub account" -ForegroundColor Yellow
Write-Host "- Vercel account" -ForegroundColor Yellow
Write-Host "- Render account" -ForegroundColor Yellow
Write-Host "- MongoDB Atlas account" -ForegroundColor Yellow
Write-Host ""

Pause

# Step 1: Create GitHub Repository
Write-Host "Step 1: Create GitHub Repository" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host "1. Go to https://github.com and log in to your account" -ForegroundColor Yellow
Write-Host "2. Click the '+' icon in the top right corner and select 'New repository'" -ForegroundColor Yellow
Write-Host "3. Name your repository (e.g., 'manox-ecommerce')" -ForegroundColor Yellow
Write-Host "4. Leave it as public (or private if you prefer)" -ForegroundColor Yellow
Write-Host "5. Don't initialize with a README" -ForegroundColor Yellow
Write-Host "6. Click 'Create repository'" -ForegroundColor Yellow
Write-Host ""

Write-Host "Once you've created the repository, please enter the repository URL below:" -ForegroundColor Cyan
Write-Host "Example: https://github.com/yourusername/manox-ecommerce.git" -ForegroundColor Cyan
Write-Host ""
$repoUrl = Read-Host "Enter your GitHub repository URL"

if (-not $repoUrl) {
    Write-Host "Error: Repository URL is required!" -ForegroundColor Red
    exit 1
}

# Set up Git remote
Write-Host "Setting up Git remote..." -ForegroundColor Yellow
git remote add origin $repoUrl
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to add remote repository!" -ForegroundColor Red
    exit 1
}

# Push code to GitHub
Write-Host "Pushing code to GitHub..." -ForegroundColor Yellow
git push -u origin master
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to push code to GitHub!" -ForegroundColor Red
    exit 1
}

Write-Host "Code successfully pushed to GitHub!" -ForegroundColor Green
Write-Host ""
Pause

# Step 2: Set up MongoDB Atlas
Write-Host "Step 2: Set up MongoDB Atlas" -ForegroundColor Green
Write-Host "===========================" -ForegroundColor Green
Write-Host "1. Go to https://www.mongodb.com/cloud/atlas" -ForegroundColor Yellow
Write-Host "2. Sign up or log in to your account" -ForegroundColor Yellow
Write-Host "3. Create a new project named 'MANOX'" -ForegroundColor Yellow
Write-Host "4. Build a Database:" -ForegroundColor Yellow
Write-Host "   - Select 'Shared' tier (Free)" -ForegroundColor Yellow
Write-Host "   - Choose AWS provider and region closest to your users" -ForegroundColor Yellow
Write-Host "   - Cluster name: 'manox-cluster'" -ForegroundColor Yellow
Write-Host "   - Click 'Create Cluster'" -ForegroundColor Yellow
Write-Host ""

Write-Host "Please complete the MongoDB setup and then enter your connection string below:" -ForegroundColor Cyan
Write-Host "Format: mongodb+srv://username:password@cluster-url/manox?retryWrites=true&w=majority" -ForegroundColor Cyan
Write-Host ""
$mongoUri = Read-Host "Enter your MongoDB connection string"

if (-not $mongoUri) {
    Write-Host "Error: MongoDB connection string is required!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Pause

# Step 3: Deploy Frontend to Vercel
Write-Host "Step 3: Deploy Frontend to Vercel" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host "Running frontend deployment script..." -ForegroundColor Yellow
Write-Host ""

# Execute frontend deployment script
.\deploy-to-vercel.ps1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Frontend deployment failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Pause

# Step 4: Deploy Backend to Render
Write-Host "Step 4: Deploy Backend to Render" -ForegroundColor Green
Write-Host "===============================" -ForegroundColor Green
Write-Host "Running backend preparation script..." -ForegroundColor Yellow
Write-Host ""

# Execute backend preparation script
.\prepare-backend-deployment.ps1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Backend preparation failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Pause

# Step 5: Final Instructions
Write-Host "Step 5: Final Deployment Steps" -ForegroundColor Green
Write-Host "=============================" -ForegroundColor Green
Write-Host "1. Go to https://render.com and create a new Web Service" -ForegroundColor Yellow
Write-Host "2. Connect your GitHub repository" -ForegroundColor Yellow
Write-Host "3. Configure the service with these settings:" -ForegroundColor Yellow
Write-Host "   - Name: manox-backend" -ForegroundColor Yellow
Write-Host "   - Region: Choose the region closest to your users" -ForegroundColor Yellow
Write-Host "   - Branch: master" -ForegroundColor Yellow
Write-Host "   - Root Directory: backend" -ForegroundColor Yellow
Write-Host "   - Environment: Node" -ForegroundColor Yellow
Write-Host "   - Build Command: npm install" -ForegroundColor Yellow
Write-Host "   - Start Command: npm start" -ForegroundColor Yellow
Write-Host "   - Instance Type: Free" -ForegroundColor Yellow
Write-Host ""
Write-Host "4. Add these environment variables:" -ForegroundColor Yellow
Write-Host "   - MONGO_URI = $mongoUri" -ForegroundColor Yellow
Write-Host "   - JWT_SECRET = [Generate a strong secret key]" -ForegroundColor Yellow
Write-Host "   - FRONTEND_URL = [Your Vercel URL - to be updated later]" -ForegroundColor Yellow
Write-Host "   - PORT = 10000" -ForegroundColor Yellow
Write-Host ""
Write-Host "5. Click 'Create Web Service'" -ForegroundColor Yellow
Write-Host "6. Wait for deployment to complete" -ForegroundColor Yellow
Write-Host "7. Note your Render URL" -ForegroundColor Yellow
Write-Host ""

Write-Host "After both services are deployed:" -ForegroundColor Cyan
Write-Host "1. Update Render's FRONTEND_URL environment variable with your Vercel URL" -ForegroundColor Cyan
Write-Host "2. Update Vercel's VITE_API_URL environment variable with your Render URL + '/api'" -ForegroundColor Cyan
Write-Host "3. Redeploy both services" -ForegroundColor Cyan
Write-Host ""

Write-Host "=========================================" -ForegroundColor Green
Write-Host "Deployment process completed!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your MANOX e-commerce platform will be accessible at your Vercel URL." -ForegroundColor Green
Write-Host ""