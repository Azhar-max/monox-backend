# MANOX Deployment Verification Guide

## Overview
This guide provides step-by-step instructions to verify that the MANOX e-commerce platform has been deployed correctly and is functioning as expected in production.

## Prerequisites
- Access to Netlify dashboard
- Access to Render dashboard
- Access to MongoDB Atlas dashboard
- Postman or similar API testing tool
- Web browser with developer tools

## Verification Steps

### 1. Frontend Deployment Verification (Netlify)

#### Check Build Status
1. Log into Netlify dashboard
2. Navigate to the MANOX site
3. Verify that the latest deployment shows "Published"
4. Check that the build log shows no errors

#### Verify Site Accessibility
1. Visit the deployed frontend URL
2. Confirm the homepage loads correctly
3. Test navigation between pages
4. Verify all images load properly

#### Check Environment Variables
1. In browser developer tools, go to Application/Storage tab
2. Check that VITE_API_URL is correctly set
3. Verify no sensitive information is exposed in client-side code

### 2. Backend Deployment Verification (Render)

#### Check Build and Deploy Status
1. Log into Render dashboard
2. Navigate to the MANOX backend service
3. Verify that the latest deployment shows "Live"
4. Check that the build log shows no errors

#### Verify Health Endpoint
1. Visit `https://your-render-app.onrender.com/api/health`
2. Confirm response shows `{ "ok": true }` with timestamp
3. Verify response time is acceptable (< 500ms)

#### Check Environment Variables
1. In Render dashboard, verify all environment variables are set:
   - MONGO_URI
   - JWT_SECRET
   - FRONTEND_URL
   - PORT

### 3. Database Connection Verification (MongoDB Atlas)

#### Check Cluster Status
1. Log into MongoDB Atlas dashboard
2. Navigate to the MANOX cluster
3. Verify cluster status shows "Idle" or "Running"
4. Check that there are no connection errors

#### Verify Database Access
1. Check that Render's IP addresses are whitelisted
2. Verify that the database user has proper read/write permissions
3. Confirm that connection logs show successful connections from Render

### 4. Integration Testing

#### API Endpoints Testing
Use Postman or similar tool to test:

1. **Health Check**
   ```
   GET https://your-render-app.onrender.com/api/health
   Expected: 200 OK with JSON response
   ```

2. **Product Listing**
   ```
   GET https://your-render-app.onrender.com/api/products
   Expected: 200 OK with product data
   ```

3. **Product Details**
   ```
   GET https://your-render-app.onrender.com/api/products/{id}
   Expected: 200 OK with specific product data
   ```

4. **Order Creation**
   ```
   POST https://your-render-app.onrender.com/api/orders
   Body: { items: [...], total: ..., customer: {...} }
   Expected: 201 Created with order data
   ```

#### Frontend-to-Backend Communication
1. Open browser developer tools
2. Go to the Network tab
3. Reload the homepage
4. Verify API calls to backend return 200 status codes
5. Check that no CORS errors appear in console

#### Authentication Flow
1. Navigate to admin login page
2. Attempt to login with invalid credentials
3. Verify proper error messages are displayed
4. Test password recovery flow (if implemented)

### 5. Cross-Origin Resource Sharing (CORS) Verification

1. Check browser console for CORS errors
2. Verify that API requests from frontend to backend are successful
3. Confirm that unauthorized origins are properly rejected

### 6. Performance Testing

#### Page Load Times
1. Use browser developer tools to measure page load times
2. Homepage should load in < 3 seconds
3. Product pages should load in < 2 seconds

#### API Response Times
1. Measure API response times using developer tools
2. All API calls should respond in < 1 second
3. Database queries should be optimized

### 7. Mobile Responsiveness

1. Test site on various mobile devices
2. Verify responsive design works correctly
3. Check touch interactions function properly
4. Confirm forms are usable on mobile

### 8. Security Verification

#### Frontend Security
1. Verify no sensitive information in client-side code
2. Check that environment variables are properly used
3. Confirm no debug information is exposed

#### Backend Security
1. Verify JWT tokens are properly validated
2. Check that rate limiting is working
3. Confirm input validation is implemented
4. Verify error messages don't expose sensitive information

### 9. Error Handling

#### Frontend Error Handling
1. Test 404 pages
2. Verify error boundaries work correctly
3. Check that loading states are properly displayed

#### Backend Error Handling
1. Test invalid API requests
2. Verify proper HTTP status codes are returned
3. Check that error logs are informative but not verbose

## Success Criteria

Deployment is considered successful when all of the following criteria are met:

✅ Frontend builds and deploys without errors
✅ Backend builds and deploys without errors
✅ MongoDB Atlas cluster is accessible
✅ All API endpoints respond correctly
✅ No CORS errors in browser console
✅ Pages load within acceptable time limits
✅ Images and assets load correctly
✅ Admin panel functions properly
✅ Shopping cart operations work
✅ Order placement is successful
✅ No security vulnerabilities detected
✅ Mobile responsiveness works correctly

## Troubleshooting Common Issues

### Frontend Issues
1. **Site not loading**: Check Netlify build logs
2. **Images not displaying**: Verify asset paths and backend connectivity
3. **API calls failing**: Check CORS configuration and backend health

### Backend Issues
1. **Service not responding**: Check Render deployment status
2. **Database connection errors**: Verify MongoDB Atlas connection string and IP whitelist
3. **Authentication failures**: Check JWT configuration and user credentials

### Database Issues
1. **Connection timeouts**: Check network access and firewall settings
2. **Permission errors**: Verify database user roles and permissions
3. **Performance issues**: Check indexes and query optimization

## Post-Deployment Monitoring

### Immediate Actions (First 24 Hours)
1. Monitor error logs on both platforms
2. Watch for any performance degradation
3. Verify user feedback is positive
4. Check analytics for unusual traffic patterns

### Ongoing Monitoring
1. Set up uptime monitoring for both frontend and backend
2. Configure alerts for critical errors
3. Regularly review performance metrics
4. Monitor database usage and performance

## Rollback Procedure

If critical issues are discovered after deployment:

1. Immediately revert Netlify to previous stable deployment
2. Revert Render to previous stable deployment
3. Restore MongoDB from latest backup if needed
4. Document the issue and solution
5. Communicate with stakeholders about the rollback

---

*This verification guide should be followed systematically to ensure the MANOX e-commerce platform is fully functional in production.*