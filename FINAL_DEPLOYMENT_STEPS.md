# Final Deployment Steps for MANOX

## Overview
This document provides a step-by-step guide to deploy your MANOX e-commerce platform to Vercel (frontend) and Render (backend) using your GitHub account.

## Prerequisites
- [x] GitHub account (already logged in)
- [ ] MongoDB Atlas account
- [ ] Vercel account (already logged in)
- [ ] Render account (already logged in)

## Step 1: Set Up MongoDB Atlas

Run the MongoDB setup script:
```powershell
.\setup-mongodb.ps1
```

Or follow these manual steps:
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account or log in
3. Create a new project named "MANOX"
4. Create a free shared cluster
5. Create a database user with a strong password
6. Configure network access to allow connections from anywhere (0.0.0.0/0)
7. Get your connection string and save it for later

## Step 2: Deploy Frontend to Vercel

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository: https://github.com/Azhar-max/manox
4. Configure project settings:
   - Framework Preset: Vite
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: dist
   - Install Command: npm install
5. Add environment variables (temporary - will update later):
   - VITE_API_URL = https://your-render-backend-url.onrender.com/api
6. Click "Deploy"
7. Note your Vercel deployment URL (e.g., https://manox-frontend.vercel.app)

## Step 3: Deploy Backend to Render

1. Go to https://render.com
2. Click "New" and select "Web Service"
3. Connect your GitHub repository: https://github.com/Azhar-max/manox
4. Configure the service:
   - Name: manox-backend
   - Region: Choose the region closest to your users
   - Branch: main
   - Root Directory: backend
   - Environment: Node
   - Build Command: npm install
   - Start Command: npm start
   - Instance Type: Free
5. Add environment variables (temporary - will update later):
   - MONGO_URI = [Your MongoDB connection string from Step 1]
   - JWT_SECRET = [Generate a strong secret key - at least 32 characters]
   - FRONTEND_URL = [Placeholder - will update after Vercel deployment]
   - PORT = 10000
6. Click "Create Web Service"
7. Note your Render deployment URL (e.g., https://manox-backend.onrender.com)

## Step 4: Update Environment Variables

### Update Render Environment Variables
1. Go to your Render dashboard
2. Click on your "manox-backend" service
3. Click "Environment" in the sidebar
4. Update the FRONTEND_URL variable to your Vercel URL:
   - FRONTEND_URL = https://your-vercel-url.vercel.app
5. Click "Save Changes"

### Update Vercel Environment Variables
1. Go to your Vercel dashboard
2. Click on your MANOX project
3. Go to "Settings" → "Environment Variables"
4. Update the VITE_API_URL variable to your Render URL + /api:
   - VITE_API_URL = https://your-render-url.onrender.com/api
5. Click "Save"

## Step 5: Redeploy Services

### Redeploy Backend on Render
1. Go to your Render dashboard
2. Click on your "manox-backend" service
3. Click "Manual Deploy" → "Deploy latest commit"

### Redeploy Frontend on Vercel
1. Go to your Vercel dashboard
2. Click on your MANOX project
3. Click "Deployments"
4. Click "Redeploy" on the latest deployment

## Step 6: Final Testing

After both services have redeployed successfully:

1. Visit your Vercel URL
2. Test all functionality:
   - Homepage loading
   - Product browsing
   - Shopping cart functionality
   - Contact form submission
   - Chat support
   - Multi-language toggle
   - Admin panel access (use the admin credentials you created)
3. Verify API endpoints are working:
   - Products API: https://your-render-url.onrender.com/api/products
   - Users API: https://your-render-url.onrender.com/api/users
   - Orders API: https://your-render-url.onrender.com/api/orders

## Troubleshooting

### Common Issues

1. **CORS errors**: Make sure FRONTEND_URL is correctly set in Render environment variables
2. **API not responding**: Check that your Render backend is running and the MONGO_URI is correct
3. **Frontend not building**: Check the build logs in Vercel dashboard
4. **Database connection errors**: Verify your MongoDB connection string and network access

### Useful Commands for Local Testing

Before deployment, you can test locally:
```bash
# Test backend
cd backend
npm start

# Test frontend
cd frontend
npm run dev
```

## Final Notes

- Initial deployment may take 5-10 minutes
- Render free tier may have cold start delays
- Make sure to update your admin credentials in the deployed application
- For production use, consider upgrading from free tiers for better performance

## Support

If you encounter any issues during deployment:
1. Check the deployment logs in both Vercel and Render dashboards
2. Verify all environment variables are correctly set
3. Ensure your MongoDB Atlas cluster is active and accessible
4. Confirm your GitHub repository contains all the latest code

🎉 **Congratulations! Your MANOX e-commerce platform will be live and accessible to customers once deployment is complete.**