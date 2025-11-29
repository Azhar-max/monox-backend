# MANOX Deployment Checklist

This checklist ensures all necessary steps are completed for deploying the MANOX e-commerce platform to Vercel (frontend) and Render (backend).

## Pre-Deployment Checklist

### Code Preparation
- [ ] All code pushed to GitHub repository
- [ ] Frontend builds successfully (`npm run build` in frontend directory)
- [ ] Backend dependencies installed (`npm install` in backend directory)
- [ ] All environment configuration files created:
  - [ ] `frontend/.env.production`
  - [ ] `backend/.env.production`
- [ ] Vercel configuration file exists (`frontend/vercel.json`)
- [ ] Render configuration file exists (`backend/render.yaml`)

### Environment Variables Preparation
**Frontend (.env.production):**
- [ ] `VITE_API_URL` set to Render backend URL
- [ ] `VITE_GOOGLE_MAPS_API_KEY` (optional)

**Backend (.env.production):**
- [ ] `MONGO_URI` - MongoDB connection string
- [ ] `JWT_SECRET` - Secure JWT secret key
- [ ] `FRONTEND_URL` - Vercel frontend URL
- [ ] `PORT` - Set to 10000

## Deployment Steps

### 1. MongoDB Atlas Setup
- [ ] MongoDB cluster created
- [ ] Network access configured (0.0.0.0/0 or specific IPs)
- [ ] Database user created
- [ ] Connection string obtained

### 2. Render Backend Deployment
- [ ] Go to Render dashboard
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Configure service:
  - Name: manox-backend
  - Environment: Node
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Instance Type: Free
- [ ] Add environment variables:
  - `MONGO_URI`: [Your MongoDB connection string]
  - `JWT_SECRET`: [Your secure secret key]
  - `FRONTEND_URL`: https://your-vercel-frontend.vercel.app (placeholder)
  - `PORT`: 10000
- [ ] Deploy service
- [ ] Note Render URL (e.g., https://manox-backend.onrender.com)

### 3. Vercel Frontend Deployment
- [ ] Go to Vercel dashboard
- [ ] Create new project
- [ ] Import GitHub repository
- [ ] Configure project:
  - Framework Preset: Vite
  - Root Directory: frontend
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Install Command: `npm install`
- [ ] Add environment variables:
  - `VITE_API_URL`: [Your Render backend URL + /api]
- [ ] Deploy project
- [ ] Note Vercel URL (e.g., https://manox-frontend.vercel.app)

### 4. Update Environment Variables
#### Render Backend Update
- [ ] Go to Render service dashboard
- [ ] Update `FRONTEND_URL` to actual Vercel frontend URL
- [ ] Save changes and wait for redeployment

#### Vercel Frontend Update (if needed)
- [ ] Go to Vercel project settings
- [ ] Verify `VITE_API_URL` is correct
- [ ] Redeploy if changes were made

### 5. Domain Configuration (Optional)
#### Frontend Domain
- [ ] Add domain to Vercel project
- [ ] Configure DNS records with domain registrar:
  - CNAME record for `www` pointing to `cname.vercel-dns.com`
  - A records for `@` pointing to Vercel IP addresses

#### Backend Domain (Optional)
- [ ] Add custom domain to Render service
- [ ] Configure DNS CNAME record for subdomain (e.g., `api.yourdomain.com`)

## Post-Deployment Testing

### Website Functionality
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Product pages display properly
- [ ] Shopping cart functions (add/remove items)
- [ ] Contact form submits
- [ ] Chat support widget appears
- [ ] Multi-language toggle works
- [ ] Responsive design on mobile devices

### Admin Panel Functionality
- [ ] Admin login works
- [ ] Dashboard loads with statistics
- [ ] Product management (create/edit/delete)
- [ ] Order management
- [ ] User management
- [ ] Settings configuration
- [ ] Notifications system
- [ ] Messages system

### API Integration
- [ ] Frontend communicates with backend
- [ ] All API endpoints respond correctly
- [ ] Database operations work (CRUD)
- [ ] Authentication functions properly

### Security
- [ ] HTTPS is enabled
- [ ] CORS is properly configured
- [ ] JWT authentication works
- [ ] Passwords are properly hashed

## Optional Features Setup

### Google Maps Integration
- [ ] Google Cloud project created
- [ ] Maps JavaScript API enabled
- [ ] API key generated and restricted
- [ ] `VITE_GOOGLE_MAPS_API_KEY` added to Vercel environment variables
- [ ] Frontend redeployed

### Email Notifications (Future Enhancement)
- [ ] Email service configured (SendGrid, etc.)
- [ ] Backend email functionality implemented
- [ ] Environment variables added

## Monitoring and Maintenance

### Performance
- [ ] Website performance tested (Lighthouse)
- [ ] Images optimized
- [ ] Caching configured
- [ ] CDN enabled if needed

### Analytics (Optional)
- [ ] Google Analytics or similar service configured
- [ ] Tracking code implemented

### Backup
- [ ] MongoDB backup strategy established
- [ ] Code backup (GitHub)
- [ ] Environment variables documented

## Support and Documentation

- [ ] Deployment documentation updated
- [ ] Support contact information visible
- [ ] User guides created (if needed)

## Final Verification

- [ ] All checklist items completed
- [ ] Website fully functional
- [ ] Admin panel fully functional
- [ ] Performance acceptable
- [ ] Security measures in place
- [ ] Documentation complete

Congratulations! Your MANOX e-commerce platform is now ready for production use.