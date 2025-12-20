# MANOX Railway Deployment Guide

This guide explains how to deploy the MANOX backend to Railway.

## Prerequisites

1. A Railway account (https://railway.app/)
2. A GitHub account
3. A MongoDB Atlas account (or other MongoDB provider)

## Step-by-Step Deployment

### 1. Prepare Your Repository

1. Ensure your code is pushed to a GitHub repository
2. The repository should have the backend code in the root directory or in a `backend` subdirectory

### 2. Create a New Railway Project

1. Go to https://railway.app/
2. Sign in to your account
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Connect your GitHub account if prompted
6. Select your MANOX repository

### 3. Configure the Service

Railway should automatically detect this as a Node.js project. If not, you can manually configure it:

1. In the service settings, set:
   - **Build Command**: `npm install`
   - **Start Command**: `./start.sh` (Linux/macOS) or `start.bat` (Windows)

2. The `railway.toml` file in this project provides these settings automatically

### 4. Set Environment Variables

In the Railway dashboard, go to your service settings and add these environment variables:

```
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=https://your-frontend-domain.com
PORT=10000
NODE_ENV=production
```

### 5. MongoDB Atlas Configuration

If using MongoDB Atlas:

1. Create a cluster
2. Add your database user
3. In Network Access, allow connections from anywhere (0.0.0.0/0) or Railway's IP ranges
4. Get your connection string and replace placeholders:
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password

### 6. Deploy

1. Click "Deploy" in Railway
2. Wait for the deployment to complete
3. Your backend should be accessible at the provided Railway URL

### 7. Verify Deployment

1. Visit your Railway-provided URL + `/health` to check if the service is running
2. Example: `https://your-app-production.up.railway.app/health`

## Troubleshooting

### Common Issues

1. **Build Failures**: Ensure all dependencies are in `package.json`
2. **Startup Failures**: Check environment variables are correctly set
3. **Database Connection**: Verify MongoDB URI and network access
4. **Port Issues**: Railway typically provides a `PORT` environment variable

### Logs

Check Railway logs for detailed error information:
1. Go to your service in Railway
2. Click on "Logs" tab
3. Review recent log entries for errors

## Additional Configuration

### Custom Domain

To use a custom domain:

1. In Railway, go to your service settings
2. Click "Custom Domains"
3. Add your domain
4. Follow Railway's instructions for DNS configuration

### Scaling

Railway automatically scales your application based on demand. For manual scaling:

1. Go to your service settings
2. Adjust the instance count and size as needed

## Support

For issues with this deployment, refer to:
- Railway Documentation: https://docs.railway.app/
- MANOX Documentation: [Link to your main documentation]