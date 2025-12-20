# MANOX E-commerce Platform - Redeployment Guide

## Overview

This guide provides step-by-step instructions for redeploying the MANOX e-commerce platform to Netlify (frontend) and Render (backend) with MongoDB Atlas as the database.

## Prerequisites

1. Access to Netlify account
2. Access to Render account
3. Access to MongoDB Atlas account
4. Git repository with the latest code
5. Updated environment variables and secrets

## Redeployment Steps

### 1. Prepare Environment Variables

#### Backend (Render) Environment Variables:
```bash
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=https://your-netlify-site.netlify.app
PORT=10000
```

#### Frontend (Netlify) Environment Variables:
```bash
VITE_API_URL=https://your-render-app.onrender.com/api
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
```

### 2. Update MongoDB Atlas Configuration

1. Log into MongoDB Atlas dashboard
2. Navigate to your cluster
3. Go to "Network Access" section
4. Add Render's IP addresses to the whitelist:
   - Check Render's documentation for current outbound IPs
   - Or add `0.0.0.0/0` for development/testing (NOT recommended for production)
5. Verify database user credentials and permissions

### 3. Deploy Backend to Render

1. Log into Render dashboard
2. Go to your MANOX backend service
3. Update environment variables:
   - MONGO_URI: Your MongoDB connection string
   - JWT_SECRET: Strong secret key
   - FRONTEND_URL: Your Netlify frontend URL
   - PORT: 10000
4. Trigger a new deployment:
   - Manual deploy: Click "Manual Deploy" → "Deploy latest commit"
   - Or push changes to your connected Git repository
5. Monitor deployment logs for any errors
6. Verify health endpoint once deployment is complete:
   ```bash
   curl https://your-render-app.onrender.com/api/health
   ```

### 4. Deploy Frontend to Netlify

1. Log into Netlify dashboard
2. Go to your MANOX frontend site
3. Update environment variables:
   - VITE_API_URL: Your Render backend URL
   - VITE_GOOGLE_MAPS_API_KEY: Your Google Maps API key (if used)
4. Trigger a new deployment:
   - Manual deploy: Click "Trigger deploy" → "Deploy site"
   - Or push changes to your connected Git repository
5. Monitor deployment logs for any errors
6. Verify site loads correctly once deployment is complete

### 5. Verify Integration

1. Visit your frontend URL in a browser
2. Open browser developer tools
3. Check for any console errors
4. Verify network requests to backend API succeed
5. Test key user flows:
   - Browse products
   - Add items to cart
   - Place an order
   - Access admin panel (if applicable)

## Rollback Procedures

### Emergency Rollback

If issues are discovered after deployment:

1. **Rollback Frontend (Netlify)**:
   ```bash
   # In Netlify dashboard:
   # 1. Go to your site
   # 2. Click on "Deploys" tab
   # 3. Find the last known good deployment
   # 4. Click "Rollback" or "Publish deploy"
   ```

2. **Rollback Backend (Render)**:
   ```bash
   # In Render dashboard:
   # 1. Go to your service
   # 2. Click on "Manual Deploy"
   # 3. Select "Deploy previous image"
   # 4. Or redeploy a specific previous commit
   ```

3. **Database Restoration**:
   ```bash
   # If database corruption occurred:
   # 1. Log into MongoDB Atlas
   # 2. Navigate to your cluster
   # 3. Go to "Backup" section
   # 4. Restore from the latest snapshot
   ```

### Detailed Rollback Steps

#### Frontend Rollback:
1. Identify the last stable deployment in Netlify
2. Rollback to that deployment
3. Monitor for any issues
4. Notify stakeholders of the rollback

#### Backend Rollback:
1. Identify the last stable deployment in Render
2. Redeploy that version
3. Update environment variables if needed
4. Monitor logs for any issues
5. Verify health endpoint responds correctly

#### Database Rollback:
1. Identify the timeframe before issues began
2. Locate the appropriate backup snapshot
3. Initiate restore process in MongoDB Atlas
4. Monitor restore progress
5. Update application connection strings if needed

## Verification Commands

### Backend Health Check:
```bash
curl -i https://your-render-app.onrender.com/api/health
```

### Product API Test:
```bash
curl -i https://your-render-app.onrender.com/api/products?limit=5
```

### Frontend Availability:
```bash
curl -i https://your-netlify-site.netlify.app
```

### End-to-End Test Script:
```bash
# Run the smoke tests
node smoke-tests.js

# Or with custom URLs:
BACKEND_URL=https://your-backend.onrender.com \
FRONTEND_URL=https://your-frontend.netlify.app \
node smoke-tests.js
```

## Monitoring and Alerts

### Set Up Monitoring:
1. Configure uptime monitoring for both frontend and backend
2. Set up MongoDB Atlas performance monitoring
3. Implement error tracking (e.g., Sentry)
4. Configure log aggregation and analysis

### Critical Alerts:
1. Service downtime notifications
2. Database connection failure alerts
3. Performance degradation warnings
4. Security breach notifications

## Secrets Management

### Rotating Secrets:

#### JWT Secret:
1. Generate a new strong secret key
2. Update in Render environment variables
3. Redeploy backend service
4. Update any dependent services if applicable

#### MongoDB Credentials:
1. Create new database user in MongoDB Atlas
2. Update MONGO_URI in Render environment variables
3. Redeploy backend service
4. Remove old database user after verification

#### API Keys:
1. Generate new keys in respective services
2. Update in Netlify/Render environment variables
3. Redeploy affected services
4. Revoke old keys after verification

## Troubleshooting Common Issues

### Deployment Failures:
1. Check build logs for specific error messages
2. Verify all environment variables are set correctly
3. Confirm dependencies are properly installed
4. Check for syntax errors in configuration files

### Runtime Errors:
1. Review application logs for error traces
2. Verify database connectivity
3. Check resource utilization (CPU, memory, disk)
4. Confirm environment variables are accessible

### Database Connection Issues:
1. Verify MongoDB Atlas IP whitelist includes Render IPs
2. Confirm database user credentials are correct
3. Check connection string format and parameters
4. Review MongoDB Atlas logs for connection attempts

### CORS Errors:
1. Verify FRONTEND_URL environment variable in backend
2. Check CORS middleware configuration
3. Confirm frontend and backend domains match
4. Review browser console for specific CORS errors

## Contact Information

### For Deployment Issues:
- Lead Developer: [Insert contact information]
- DevOps Engineer: [Insert contact information]

### For Database Issues:
- Database Administrator: [Insert contact information]
- MongoDB Support: [Insert contact information]

### For Infrastructure Issues:
- Netlify Support: [Insert contact information]
- Render Support: [Insert contact information]
- MongoDB Atlas Support: [Insert contact information]

## Appendix: Useful Links

- [Netlify Documentation](https://docs.netlify.com/)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Express.js Documentation](https://expressjs.com/)

---
*Last Updated: December 2025*