# MANOX Backend for Railway Deployment

This is the backend service for the MANOX e-commerce platform, configured for deployment on Railway.

## Deployment Instructions

1. Push this code to a GitHub repository
2. Connect Railway to your repository
3. Railway will automatically detect the Node.js project and use the `start.sh` script for deployment
4. Set the following environment variables in Railway:
   - `MONGO_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret key
   - `FRONTEND_URL` - Your frontend URL (e.g., https://your-frontend.vercel.app)
   - `PORT` - The port to run the server on (default: 10000)

## Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon

## Health Checks

The application exposes a `/health` endpoint for Railway health checks.