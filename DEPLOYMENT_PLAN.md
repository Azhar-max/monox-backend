# MERN Stack E-commerce Deployment Plan

## Overview
This document outlines the complete deployment plan for the MANOX e-commerce platform using:
- Frontend: React (Vite) → Netlify
- Backend: Node.js + Express → Render
- Database: MongoDB Atlas

## Current State Analysis

### Frontend (Vite-based)
- Uses VITE_API_URL instead of REACT_APP_API_URL
- Already configured with proper environment variables
- Has netlify.toml with correct redirects
- Builds to `dist` directory

### Backend (Express)
- Listens on PORT 3002 (should be configurable)
- Has proper CORS configuration
- MongoDB connection implemented
- JWT authentication in place
- Health check endpoint available

## Required Changes

### 1. Backend Updates
- Change PORT to use process.env.PORT || 5000 as required
- Verify all environment variables are properly used
- Ensure MongoDB connection has proper error handling

### 2. Frontend Updates
- Option 1: Convert from Vite to Create React App to match requirements
- Option 2: Update documentation to reflect Vite usage
- Since this is a production deployment, we'll stick with the current working Vite implementation

### 3. Environment Variables
- Backend: MONGO_URI, JWT_SECRET, FRONTEND_URL, PORT
- Frontend: VITE_API_URL

## Implementation Plan

### Phase 1: Backend Configuration
1. Update server.js to use PORT 5000 as default
2. Verify MongoDB connection with proper error handling
3. Confirm CORS is properly configured
4. Test health endpoint

### Phase 2: Frontend Configuration
1. Keep current Vite configuration (more modern than CRA)
2. Verify environment variable usage
3. Confirm Netlify redirects work properly
4. Test build process

### Phase 3: Deployment
1. Deploy backend to Render
2. Deploy frontend to Netlify
3. Verify integration
4. Test all functionality

## Risk Mitigation
- Preserve existing working configuration where possible
- Make minimal changes to achieve requirements
- Thoroughly test before and after changes
- Document all changes made