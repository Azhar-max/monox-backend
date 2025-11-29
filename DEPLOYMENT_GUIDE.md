# MANOX Deployment Guide

This guide will help you deploy the MANOX e-commerce website and admin panel to production environments.

## Prerequisites

1. Domain name (e.g., from Namecheap, GoDaddy, etc.)
2. Hosting accounts:
   - Frontend hosting (Vercel recommended)
   - Backend hosting (Render recommended)
3. Google Maps API key (for map integration)
4. MongoDB Atlas account (for database)

## Step 1: Environment Configuration

### Frontend Environment Variables

Create a `.env.production` file in the `frontend` directory with the following variables:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
```

### Backend Environment Variables

Create a `.env.production` file in the `backend` directory with the following variables:

```env
MONGO_URI=mongodb+srv://username:password@cluster-url/manox?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=https://your-frontend-domain.vercel.app
PORT=10000
```

## Step 2: Google Maps Integration Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Maps JavaScript API
4. Create credentials (API Key)
5. Restrict the API key to your domain for security
6. Add the API key to your frontend environment variables

## Step 3: Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Sign up/in to [Vercel](https://vercel.com/)
3. Create a new project and import your GitHub repository
4. Set the build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Add environment variables in the Vercel dashboard
6. Deploy the project

## Step 4: Backend Deployment (Render)

1. Push your code to GitHub
2. Sign up/in to [Render](https://render.com/)
3. Create a new Web Service
4. Connect your GitHub repository
5. Set the build settings:
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add environment variables in the Render dashboard
7. Set up a custom domain if needed

## Step 5: Domain Configuration

### Pointing Domain to Frontend (Vercel)

1. In your domain registrar's DNS settings, add:
   - A CNAME record pointing `www` to `cname.vercel-dns.com`
   - An A record pointing `@` to Vercel's IP addresses (check Vercel dashboard)

### Pointing Domain to Backend (Render)

1. In your domain registrar's DNS settings, add:
   - A CNAME record for your backend subdomain (e.g., `api.yourdomain.com`) pointing to Render

## Step 6: Final Testing

1. Test all website pages for functionality
2. Test admin panel login and all features
3. Verify Google Maps integration
4. Test chat support functionality
5. Check responsive design on mobile devices
6. Verify all forms submit correctly
7. Test payment integration (if applicable)

## Step 7: Performance Optimization

1. Enable CDN for static assets
2. Set up proper caching headers
3. Optimize images for web
4. Enable Gzip compression
5. Monitor performance with tools like Lighthouse

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `FRONTEND_URL` in backend env matches your frontend domain
2. **Database Connection**: Verify `MONGO_URI` is correct and database is accessible
3. **API Errors**: Check that `VITE_API_URL` points to the correct backend URL
4. **Map Not Loading**: Verify Google Maps API key is valid and properly configured

### Support

If you encounter issues during deployment, check the project documentation or contact support.

## Post-Deployment Checklist

- [ ] Website is accessible via domain
- [ ] Admin panel is functional
- [ ] Google Maps integration works
- [ ] Chat support is operational
- [ ] All forms submit correctly
- [ ] Mobile responsiveness verified
- [ ] Performance optimization applied
- [ ] SSL certificate is active
- [ ] Analytics tracking implemented (if needed)

Congratulations! Your MANOX e-commerce platform is now ready for production use.