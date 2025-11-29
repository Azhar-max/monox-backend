#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('MANOX Deployment Checker');
console.log('======================');

const requiredFiles = [
  { path: 'frontend/vercel.json', description: 'Vercel configuration' },
  { path: 'backend/render.yaml', description: 'Render configuration' },
  { path: 'DEPLOYMENT_INSTRUCTIONS.md', description: 'Deployment instructions' },
  { path: 'FINAL_DEPLOYMENT_GUIDE.md', description: 'Complete deployment guide' }
];

const optionalFiles = [
  { path: 'frontend/.env', description: 'Frontend environment variables' },
  { path: 'backend/.env', description: 'Backend environment variables' }
];

let allRequiredFilesExist = true;

console.log('\nChecking required files:');
requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, file.path);
  if (fs.existsSync(fullPath)) {
    console.log(`✓ ${file.description} (${file.path})`);
  } else {
    console.log(`✗ ${file.description} (${file.path}) - MISSING`);
    allRequiredFilesExist = false;
  }
});

console.log('\nChecking optional files:');
optionalFiles.forEach(file => {
  const fullPath = path.join(__dirname, file.path);
  if (fs.existsSync(fullPath)) {
    console.log(`✓ ${file.description} (${file.path})`);
  } else {
    console.log(`○ ${file.description} (${file.path}) - Not found (optional)`);
  }
});

console.log('\nSummary:');
if (allRequiredFilesExist) {
  console.log('✓ All required files are present. You are ready to deploy!');
  console.log('\nNext steps:');
  console.log('1. Push your code to GitHub');
  console.log('2. Deploy to Vercel (frontend) and Render (backend)');
  console.log('3. Set environment variables in the deployment platforms');
  console.log('4. Refer to DEPLOYMENT_INSTRUCTIONS.md for detailed steps');
} else {
  console.log('✗ Some required files are missing. Please check the errors above.');
}

console.log('\nFor complete deployment instructions, see FINAL_DEPLOYMENT_GUIDE.md');