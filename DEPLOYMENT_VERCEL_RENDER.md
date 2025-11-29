# MANOX Deployment Guide: Vercel (Frontend) + Render (Backend)

This guide provides step-by-step instructions for deploying the MANOX e-commerce platform using Vercel for the frontend and Render for the backend.

## Prerequisites

1. GitHub account
2. Vercel account (free tier available)
3. Render account (free tier available)
4. MongoDB Atlas account (free tier available)
5. Domain name (optional but recommended)

## Step 1: Prepare Your Code

1. Ensure your code is pushed to a GitHub repository
2. Verify the following files exist in your repository:
   - `frontend/vercel.json` (Vercel configuration)
   - `backend/render.yaml` (Render configuration)
   - `frontend/.env.production` (Frontend production environment variables)
   - `backend/.env.production` (Backend production environment variables)

## Step 2: Deploy Backend to Render

### 2.1 Create MongoDB Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Configure network access to allow connections from anywhere (0.0.0.0/0)
4. Create a database user
5. Get your connection string (similar to):
   ```
   mongodb+srv://username:password@cluster-url/manox?retryWrites=true&w=majority
   ```

### 2.2 Deploy to Render

1. Go to [Render](https://render.com) and sign up/sign in
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: manox-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free
5. Add environment variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong secret key (e.g., random string of 32+ characters)
   - `FRONTEND_URL`: `https://your-vercel-frontend.vercel.app` (you'll update this after deploying frontend)
   - `PORT`: 10000
6. Click "Create Web Service"
7. Wait for deployment to complete (this may take a few minutes)
8. Note your Render URL (similar to): `https://manox-backend.onrender.com`

## Step 3: Deploy Frontend to Vercel

### 3.1 Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign up/sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build and Output Settings**:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`
5. Add environment variables:
   - `VITE_API_URL`: Your Render backend URL + `/api` (e.g., `https://manox-backend.onrender.com/api`)
6. Click "Deploy"
7. Wait for deployment to complete

## Step 4: Update Environment Variables

### 4.1 Update Render Backend

1. Go to your Render dashboard
2. Click on your manox-backend service
3. Go to "Environment" tab
4. Update `FRONTEND_URL` to your Vercel frontend URL (e.g., `https://manox-frontend.vercel.app`)
5. Click "Save Changes"
6. Wait for redeployment

### 4.2 Update Vercel Frontend (if needed)

1. Go to your Vercel dashboard
2. Click on your project
3. Go to "Settings" → "Environment Variables"
4. Verify `VITE_API_URL` is correct
5. If you made changes, redeploy your frontend

## Step 5: Domain Configuration

### 5.1 Point Domain to Vercel Frontend

1. In your domain registrar's DNS settings, add:
   - A CNAME record pointing `www` to `cname.vercel-dns.com`
   - An A record pointing `@` to Vercel's IP addresses (check Vercel dashboard)

2. In Vercel dashboard:
   - Go to your project → Settings → Domains
   - Add your domain
   - Follow the verification steps

### 5.2 Point Domain to Render Backend (Optional)

If you want a custom backend domain:
1. In your domain registrar's DNS settings, add:
   - A CNAME record for your backend subdomain (e.g., `api.yourdomain.com`) pointing to Render

2. In Render dashboard:
   - Go to your service → Settings → Custom Domains
   - Add your custom domain
   - Follow the verification steps

## Step 6: Final Testing

1. Visit your frontend URL and verify:
   - Website loads correctly
   - All pages are accessible
   - Products display properly
   - Shopping cart works
   - Contact form submits
   - Chat support appears

2. Test admin panel:
   - Go to `/admin/login`
   - Log in with admin credentials
   - Verify all admin functions work:
     - Dashboard statistics
     - Product management
     - Order processing
     - User management
     - Settings

3. Test API connectivity:
   - Verify frontend can communicate with backend
   - Check that all API endpoints respond correctly

## Step 7: Google Maps Integration (Optional)

To enable Google Maps on the contact page:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Maps JavaScript API
4. Create credentials (API Key)
5. Restrict the API key to your domain for security
6. Update your Vercel environment variables:
   - Add `VITE_GOOGLE_MAPS_API_KEY` with your API key
7. Redeploy your frontend

## Troubleshooting

### Common Issues

1. **CORS Errors**: 
   - Ensure `FRONTEND_URL` in backend env matches your frontend domain
   - Check that your frontend URL is correctly configured in Render

2. **Database Connection**: 
   - Verify `MONGO_URI` is correct
   - Ensure MongoDB Atlas network access allows connections from Render

3. **API Errors**: 
   - Check that `VITE_API_URL` points to the correct backend URL
   - Verify backend is running and accessible

4. **Build Failures**: 
   - Check build logs in Vercel/Render dashboards
   - Ensure all dependencies are correctly specified in package.json

### Support

If you encounter issues during deployment:
1. Check the build logs in Vercel and Render dashboards
2. Verify all environment variables are correctly set
3. Ensure your MongoDB connection string is correct
4. Confirm network access is properly configured

## Post-Deployment Checklist

- [ ] Website is accessible via domain
- [ ] Admin panel is functional
- [ ] All forms submit correctly
- [ ] Mobile responsiveness verified
- [ ] Performance optimization applied
- [ ] SSL certificate is active
- [ ] Google Maps integration works (if configured)
- [ ] Chat support is operational

Congratulations! Your MANOX e-commerce platform is now deployed and ready for production use.