# MANOX - Complete Deployment Guide

This guide provides complete instructions for deploying the MANOX e-commerce application to production using Vercel for the frontend and Render for the backend.

## Architecture Overview

```
┌─────────────────┐    API Calls    ┌──────────────────┐
│   Frontend      ├─────────────────┤    Backend       │
│   (Vercel)      │◀────────────────┤   (Render)       │
└─────────────────┘                 └──────────────────┘
         │                                   │
         ▼                                   ▼
  ┌─────────────┐                    ┌───────────────┐
  │    User     │                    │  MongoDB      │
  │  Browser    │                    │  (Atlas)      │
  └─────────────┘                    └───────────────┘
```

## Prerequisites

Before starting, you'll need:

1. **GitHub Account** - To host your code
2. **Vercel Account** - For frontend deployment
3. **Render Account** - For backend deployment
4. **MongoDB Atlas Account** - For database hosting
5. **Node.js** (v18 or higher) - For local development/testing

## Step 1: Prepare Your Code

### 1.1 Verify All Configuration Files

Ensure these files exist in your project:
- `frontend/vercel.json` - Vercel configuration
- `backend/render.yaml` - Render configuration
- `DEPLOYMENT_INSTRUCTIONS.md` - Detailed deployment guide

### 1.2 Check Environment Variables

Verify these files exist:
- `frontend/.env` - Frontend environment variables
- `backend/.env` - Backend environment variables

## Step 2: Set Up MongoDB Atlas

### 2.1 Create Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free M0 cluster
3. Select AWS, GCP, or Azure as your cloud provider
4. Choose a region near your users

### 2.2 Configure Database Access
1. Create a database user:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication method
   - Enter username and secure password
   - Assign "Read and write to any database" permissions

### 2.3 Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Add your current IP address or allow access from anywhere (0.0.0.0/0) for development
3. For production, add only specific IP addresses

### 2.4 Get Connection String
1. Go to "Database" → "Clusters"
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Copy the connection string and replace placeholders:
   ```
   mongodb+srv://<username>:<password>@<cluster-url>/manox?retryWrites=true&w=majority
   ```

## Step 3: Push Code to GitHub

### 3.1 Initialize Git Repository (if not already done)
```bash
cd manox_updated
git init
git add .
git commit -m "Initial commit"
```

### 3.2 Create GitHub Repository
1. Go to GitHub and create a new repository
2. Follow the instructions to push your existing repository

## Step 4: Deploy Backend to Render

### 4.1 Connect Render to GitHub
1. Go to [render.com](https://render.com) and sign in
2. Click "New" → "Web Service"
3. Connect to your GitHub repository
4. Grant Render access to your repository

### 4.2 Configure Web Service
Fill in these details:
- **Name**: manox-backend
- **Region**: Choose the region closest to your users
- **Branch**: main (or your default branch)
- **Root Directory**: backend
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 4.3 Set Environment Variables
In the "Environment Variables" section, add:
```
MONGO_URI=mongodb+srv://username:password@cluster-url/manox?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here (generate a random secure string)
FRONTEND_URL=https://your-frontend.vercel.app (will update after frontend deployment)
PORT=10000
```

### 4.4 Deploy
Click "Create Web Service" and wait for deployment to complete.

## Step 5: Deploy Frontend to Vercel

### 5.1 Connect Vercel to GitHub
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository

### 5.2 Configure Project
- **Project Name**: manox-frontend
- **Framework Preset**: Vite
- **Root Directory**: frontend
- **Build Command**: `npm run build`
- **Output Directory**: dist
- **Install Command**: `npm install`

### 5.3 Set Environment Variables
Add this environment variable:
```
VITE_API_URL=https://your-backend-url.onrender.com/api (will update after backend deployment)
```

### 5.4 Deploy
Click "Deploy" and wait for deployment to complete.

## Step 6: Update Environment Variables

### 6.1 Update Frontend VITE_API_URL
1. Go to your Vercel project
2. Go to "Settings" → "Environment Variables"
3. Update `VITE_API_URL` with your actual Render backend URL
4. Trigger a redeploy

### 6.2 Update Backend FRONTEND_URL
1. Go to your Render service
2. Go to "Environment" → "Environment Variables"
3. Update `FRONTEND_URL` with your actual Vercel frontend URL
4. Trigger a redeploy

## Step 7: Seed Database

### 7.1 Connect to Your MongoDB Database
Use MongoDB Compass or the Atlas UI to connect to your database.

### 7.2 Run Seed Script
From your local machine:
```bash
cd backend
node seed.js
```

This will populate your database with products from the assets folder.

## Step 8: Create Admin User

### 8.1 Register Through Frontend
1. Go to your deployed frontend
2. Register a new user account

### 8.2 Update User Role to Admin
Using MongoDB Compass or the Atlas UI:
```javascript
db.users.updateOne(
  { email: "your-admin-email@example.com" },
  { $set: { role: "admin" } }
)
```

## Step 9: Test Your Deployment

### 9.1 Frontend Tests
1. Visit your frontend URL
2. Browse products
3. Test shopping cart functionality
4. Test admin login with your admin credentials

### 9.2 Backend Tests
1. Test API endpoints:
   - `GET /api/health` - Should return status OK
   - `GET /api/products` - Should return product list
   - `POST /api/auth/login` - Should allow login

### 9.3 Admin Panel Tests
1. Go to `/admin/login`
2. Log in with admin credentials
3. Test all admin functionality:
   - Dashboard analytics
   - Product management
   - Order management
   - User management
   - Settings

## Troubleshooting Common Issues

### Issue: CORS Errors
**Solution**: Ensure `FRONTEND_URL` in your backend environment variables exactly matches your Vercel frontend URL.

### Issue: Database Connection Failed
**Solution**: 
1. Verify `MONGO_URI` is correct
2. Check that your IP is whitelisted in MongoDB Atlas
3. Ensure database user credentials are correct

### Issue: Environment Variables Not Loading
**Solution**: 
1. Check for typos in variable names
2. Redeploy after updating environment variables
3. Verify variables are set at the correct level (project vs. environment)

### Issue: Products Not Showing
**Solution**: 
1. Verify database was seeded correctly
2. Check that products collection exists in MongoDB
3. Verify API endpoints are returning data

## Monitoring and Maintenance

### Vercel Monitoring
- Check deployment logs in the Vercel dashboard
- Monitor performance metrics
- Set up alerts for build failures

### Render Monitoring
- Check logs in the Render dashboard
- Monitor CPU and memory usage
- Set up alerts for downtime

### MongoDB Atlas Monitoring
- Monitor database performance
- Set up alerts for connection issues
- Monitor storage usage

## Scaling Considerations

### For High Traffic
1. Upgrade from free tiers to paid plans
2. Enable caching in your backend
3. Use a CDN for static assets
4. Implement database indexing

### Security Best Practices
1. Use HTTPS (automatically provided by Vercel and Render)
2. Rotate JWT secrets periodically
3. Implement rate limiting
4. Use strong passwords for database users
5. Regularly update dependencies

## Cost Management

### Free Tier Limits
- **Vercel**: 100GB bandwidth, 500 builds/month
- **Render**: 512MB RAM, 100GB bandwidth/month
- **MongoDB Atlas**: 512MB storage, shared RAM

### When to Upgrade
- Exceeding free tier limits
- Need for custom domains with SSL
- Require better performance
- Need for team collaboration features

## Updating Your Application

### For Code Changes
1. Push changes to GitHub
2. Vercel and Render will automatically redeploy
3. Monitor deployments for errors

### For Environment Variable Changes
1. Update variables in Vercel/Render dashboards
2. Manually trigger redeployment
3. Test changes after deployment

### For Database Schema Changes
1. Backup your database
2. Apply changes carefully
3. Update both frontend and backend code as needed

## Support and Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Render Documentation**: https://render.com/docs
- **MongoDB Atlas Documentation**: https://docs.atlas.mongodb.com
- **MANOX Documentation**: See project README files

This deployment guide should help you successfully deploy your MANOX application to production with a globally accessible URL that anyone can visit.