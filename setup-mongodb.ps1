# PowerShell script to guide MongoDB Atlas setup
Write-Host "=========================================" -ForegroundColor Green
Write-Host "MongoDB Atlas Setup Guide" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Step 1: Create MongoDB Atlas Account" -ForegroundColor Yellow
Write-Host "===================================" -ForegroundColor Yellow
Write-Host "1. Go to https://www.mongodb.com/cloud/atlas" -ForegroundColor Cyan
Write-Host "2. Click 'Try Free' or 'Sign In' if you already have an account" -ForegroundColor Cyan
Write-Host "3. Sign up with your GitHub account (since you're already logged in)" -ForegroundColor Cyan
Write-Host ""

Pause

Write-Host "Step 2: Create Project" -ForegroundColor Yellow
Write-Host "=====================" -ForegroundColor Yellow
Write-Host "1. After logging in, you'll see the MongoDB Atlas dashboard" -ForegroundColor Cyan
Write-Host "2. Click 'Create' to create a new project" -ForegroundColor Cyan
Write-Host "3. Name your project 'MANOX'" -ForegroundColor Cyan
Write-Host "4. Click 'Next' and then 'Create Project'" -ForegroundColor Cyan
Write-Host ""

Pause

Write-Host "Step 3: Create Free Cluster" -ForegroundColor Yellow
Write-Host "==========================" -ForegroundColor Yellow
Write-Host "1. Click 'Build a Database'" -ForegroundColor Cyan
Write-Host "2. Select the 'Shared' tier (Free forever)" -ForegroundColor Cyan
Write-Host "3. Choose AWS as the cloud provider" -ForegroundColor Cyan
Write-Host "4. Select the region closest to your users" -ForegroundColor Cyan
Write-Host "5. Leave the cluster name as default or name it 'manox-cluster'" -ForegroundColor Cyan
Write-Host "6. Click 'Create Cluster'" -ForegroundColor Cyan
Write-Host ""

Write-Host "Note: Cluster creation may take 1-3 minutes..." -ForegroundColor Magenta
Write-Host ""

Pause

Write-Host "Step 4: Create Database User" -ForegroundColor Yellow
Write-Host "===========================" -ForegroundColor Yellow
Write-Host "1. Once your cluster is created, click 'Database Access' in the left sidebar" -ForegroundColor Cyan
Write-Host "2. Click 'Add New Database User'" -ForegroundColor Cyan
Write-Host "3. Select 'Password' as the authentication method" -ForegroundColor Cyan
Write-Host "4. Enter a username (e.g., 'manox-user')" -ForegroundColor Cyan
Write-Host "5. Enter a strong password (save this somewhere safe)" -ForegroundColor Cyan
Write-Host "6. For user privileges, select 'Atlas admin'" -ForegroundColor Cyan
Write-Host "7. Click 'Add User'" -ForegroundColor Cyan
Write-Host ""

Pause

Write-Host "Step 5: Configure Network Access" -ForegroundColor Yellow
Write-Host "===============================" -ForegroundColor Yellow
Write-Host "1. Click 'Network Access' in the left sidebar" -ForegroundColor Cyan
Write-Host "2. Click 'Add IP Address'" -ForegroundColor Cyan
Write-Host "3. Select 'Allow Access from Anywhere' (0.0.0.0/0)" -ForegroundColor Cyan
Write-Host "4. Add a comment like 'MANOX deployment'" -ForegroundColor Cyan
Write-Host "5. Click 'Confirm'" -ForegroundColor Cyan
Write-Host ""

Write-Host "Note: For production, you should restrict this to specific IP addresses" -ForegroundColor Magenta
Write-Host ""

Pause

Write-Host "Step 6: Get Connection String" -ForegroundColor Yellow
Write-Host "============================" -ForegroundColor Yellow
Write-Host "1. Click 'Database' in the left sidebar" -ForegroundColor Cyan
Write-Host "2. Click 'Connect' on your cluster" -ForegroundColor Cyan
Write-Host "3. Select 'Connect your application'" -ForegroundColor Cyan
Write-Host "4. Copy the connection string" -ForegroundColor Cyan
Write-Host "5. Replace <password> with your database user password" -ForegroundColor Cyan
Write-Host "6. Replace 'myFirstDatabase' with 'manox'" -ForegroundColor Cyan
Write-Host ""

Write-Host "Example connection string:" -ForegroundColor Yellow
Write-Host "mongodb+srv://manox-user:your_password@cluster0.abc123.mongodb.net/manox?retryWrites=true&w=majority" -ForegroundColor Cyan
Write-Host ""

Write-Host "Please copy and save your connection string as you'll need it for deployment:" -ForegroundColor Magenta
Write-Host ""
$mongoUri = Read-Host "Enter your MongoDB connection string (paste it here)"

if ($mongoUri) {
    Write-Host ""
    Write-Host "MongoDB connection string saved!" -ForegroundColor Green
    Write-Host "You'll use this when deploying to Render." -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "No connection string entered. You can get this later from your MongoDB Atlas dashboard." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host "MongoDB Atlas Setup Complete!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Deploy your frontend to Vercel through the dashboard" -ForegroundColor Yellow
Write-Host "2. Deploy your backend to Render through the dashboard" -ForegroundColor Yellow
Write-Host "3. Update environment variables with your URLs" -ForegroundColor Yellow
Write-Host ""