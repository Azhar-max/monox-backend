#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('MANOX Environment Setup Script');
console.log('==============================');

// Create .env file for frontend
const frontendEnvPath = path.join(__dirname, 'frontend', '.env');
const frontendEnvContent = `# Frontend Environment Variables
VITE_API_URL=https://your-backend-url.onrender.com/api
`;

if (!fs.existsSync(frontendEnvPath)) {
  fs.writeFileSync(frontendEnvPath, frontendEnvContent);
  console.log('✓ Created frontend .env file');
} else {
  console.log('- Frontend .env file already exists');
}

// Create .env file for backend
const backendEnvPath = path.join(__dirname, 'backend', '.env');
const backendEnvContent = `# Backend Environment Variables
MONGO_URI=mongodb+srv://username:password@cluster-url/manox?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=https://your-frontend.vercel.app
PORT=10000
`;

if (!fs.existsSync(backendEnvPath)) {
  fs.writeFileSync(backendEnvPath, backendEnvContent);
  console.log('✓ Created backend .env file');
} else {
  console.log('- Backend .env file already exists');
}

console.log('\nNext steps:');
console.log('1. Update the .env files with your actual values');
console.log('2. Push your code to GitHub');
console.log('3. Deploy to Vercel (frontend) and Render (backend)');
console.log('4. Set environment variables in the deployment platforms');
console.log('5. Redeploy after setting environment variables');

console.log('\nFor detailed instructions, see DEPLOYMENT_INSTRUCTIONS.md');