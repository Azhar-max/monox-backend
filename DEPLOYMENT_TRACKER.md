# MANOX Deployment Tracker

This document tracks the deployment progress of the MANOX e-commerce platform to Vercel (frontend) and Render (backend).

## Prerequisites
### GitHub Account
- [x] Create GitHub account
- [x] Verify email address

### MongoDB Atlas Account
- [ ] Create MongoDB Atlas account
- [ ] Verify email address

### Vercel Account
- [x] Create Vercel account
- [ ] Verify email address

### Render Account
- [x] Create Render account
- [ ] Verify email address

## Repository Setup
### Create Repository
- [x] Go to https://github.com
- [x] Click "New" → "Repository"
- [x] Name repository "manox"
- [x] Set visibility to Public
- [x] Do NOT initialize with README
- [x] Click "Create repository"

### Push Code
- [x] Open terminal in project root
- [x] Run: `git remote add origin https://github.com/Azhar-max/manox.git`
- [x] Run: `git push -u origin main`
- [x] Verify code is pushed to GitHub

## MongoDB Atlas Setup
### Create Project
- [ ] Go to https://www.mongodb.com/cloud/atlas
- [ ] Click "Create" → "Project"
- [ ] Name project "MANOX"
- [ ] Click "Next" → "Create Project"

### Create Cluster
- [ ] Click "Build a Database"
- [ ] Select "Shared" tier (Free forever)
- [ ] Choose AWS provider
- [ ] Select region closest to users
- [ ] Name cluster "manox-cluster"
- [ ] Click "Create Cluster"

### Create Database User
- [ ] Click "Database Access" in sidebar
- [ ] Click "Add New Database User"
- [ ] Select "Password" authentication method
- [ ] Enter username "manox-user"
- [ ] Generate and save strong password
- [ ] Select "Atlas admin" privileges
- [ ] Click "Add User"

### Configure Network Access
- [ ] Click "Network Access" in sidebar
- [ ] Click "Add IP Address"
- [ ] Select "Allow Access from Anywhere" (0.0.0.0/0)
- [ ] Add comment "MANOX deployment"
- [ ] Click "Confirm"

### Get Connection String
- [ ] Click "Database" in sidebar
- [ ] Click "Connect" on cluster
- [ ] Select "Connect your application"
- [ ] Copy connection string
- [ ] Replace `<password>` with actual password
- [ ] Replace `myFirstDatabase` with `manox`

## Render Backend Deployment
### Create Web Service
- [ ] Go to https://render.com
- [ ] Click "New" → "Web Service"
- [ ] Connect GitHub repository
- [ ] Configure service:
  - Name: manox-backend
  - Region: [Choose closest to users]
  - Branch: main
  - Root Directory: backend
  - Environment: Node
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Instance Type: Free
- [ ] Add environment variables:
  - `MONGO_URI` = [Your MongoDB connection string]
  - `JWT_SECRET` = [Generate strong secret - at least 32 characters]
  - `FRONTEND_URL` = [Placeholder - will update after Vercel deployment]
  - `PORT` = 10000
- [ ] Click "Create Web Service"
- [ ] Wait for deployment to complete
- [ ] Note Render URL

## Vercel Frontend Deployment
### Create Project
- [ ] Go to https://vercel.com/dashboard
- [ ] Click "New Project"
- [ ] Import GitHub repository
- [ ] Configure project:
  - Framework Preset: Vite
  - Root Directory: frontend
  - Build Command: `npm run build`
  - Output Directory: dist
  - Install Command: `npm install`
- [ ] Add environment variables:
  - `VITE_API_URL` = [Placeholder - will update after Render deployment]
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Note Vercel URL

## Update Environment Variables
### Update Render
- [ ] Go to Render dashboard
- [ ] Click on "manox-backend" service
- [ ] Click "Environment" in sidebar
- [ ] Update `FRONTEND_URL` to Vercel URL
- [ ] Click "Save Changes"
- [ ] Wait for redeployment

### Update Vercel
- [ ] Go to Vercel dashboard
- [ ] Click on MANOX project
- [ ] Go to "Settings" → "Environment Variables"
- [ ] Update `VITE_API_URL` to Render URL + `/api`
- [ ] Click "Save"
- [ ] Trigger redeployment

## Final Testing
### Frontend Testing
- [ ] Visit Vercel URL
- [ ] Test homepage loading
- [ ] Browse products
- [ ] Test shopping cart
- [ ] Submit contact form
- [ ] Test chat support
- [ ] Test multi-language toggle
- [ ] Test dark/light theme toggle

### Admin Panel Testing
- [ ] Visit Vercel URL + `/admin`
- [ ] Log in with admin credentials
- [ ] Test dashboard loading
- [ ] Test product management
- [ ] Test order management
- [ ] Test user management
- [ ] Test settings

### API Testing
- [ ] Test products API: Render URL + `/api/products`
- [ ] Test users API: Render URL + `/api/users`
- [ ] Test orders API: Render URL + `/api/orders`
- [ ] Test auth API: Render URL + `/api/auth/login`

### Performance Testing
- [ ] Test page load times
- [ ] Test mobile responsiveness
- [ ] Test cross-browser compatibility

## Completion
- [ ] All deployment steps completed
- [ ] All environment variables correctly set
- [ ] All functionality tested and working
- [ ] Performance optimized
- [ ] Ready for production use

🎉 **MANOX e-commerce platform is ready for production!**