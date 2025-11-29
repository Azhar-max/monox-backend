/**
 * Deployment Verification Script for MANOX
 * 
 * This script helps verify that your MANOX deployment is properly configured
 * before and after deployment to Vercel and Render.
 */

// Import required modules
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

// Function to check if a file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Function to check if a directory exists
function dirExists(dirPath) {
  return fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();
}

// Function to read and parse JSON file
function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.log(`${colors.red}Error reading ${filePath}: ${error.message}${colors.reset}`);
    return null;
  }
}

// Function to check environment variables in a file
function checkEnvFile(filePath, requiredVars) {
  if (!fileExists(filePath)) {
    console.log(`${colors.yellow}Warning: ${filePath} not found${colors.reset}`);
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const foundVars = [];

  lines.forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      if (key && value) {
        foundVars.push(key.trim());
      }
    }
  });

  let allFound = true;
  requiredVars.forEach(varName => {
    if (foundVars.includes(varName)) {
      console.log(`${colors.green}✓ ${varName} found in ${filePath}${colors.reset}`);
    } else {
      console.log(`${colors.red}✗ ${varName} missing in ${filePath}${colors.reset}`);
      allFound = false;
    }
  });

  return allFound;
}

// Function to check package.json scripts
function checkPackageScripts(packagePath, requiredScripts) {
  const packageJson = readJsonFile(packagePath);
  if (!packageJson) return false;

  let allFound = true;
  requiredScripts.forEach(scriptName => {
    if (packageJson.scripts && packageJson.scripts[scriptName]) {
      console.log(`${colors.green}✓ Script "${scriptName}" found in ${packagePath}${colors.reset}`);
    } else {
      console.log(`${colors.red}✗ Script "${scriptName}" missing in ${packagePath}${colors.reset}`);
      allFound = false;
    }
  });

  return allFound;
}

// Function to check configuration files
function checkConfigFiles() {
  console.log(`${colors.blue}Checking configuration files...${colors.reset}\n`);

  // Check frontend configuration
  const frontendChecks = [
    {
      name: 'Vercel config',
      path: 'frontend/vercel.json',
      required: true
    },
    {
      name: 'Frontend package.json',
      path: 'frontend/package.json',
      required: true
    },
    {
      name: 'Frontend .env',
      path: 'frontend/.env',
      required: false
    },
    {
      name: 'Frontend .env.production',
      path: 'frontend/.env.production',
      required: true
    }
  ];

  // Check backend configuration
  const backendChecks = [
    {
      name: 'Render config',
      path: 'backend/render.yaml',
      required: true
    },
    {
      name: 'Backend package.json',
      path: 'backend/package.json',
      required: true
    },
    {
      name: 'Backend .env',
      path: 'backend/.env',
      required: false
    },
    {
      name: 'Backend .env.production',
      path: 'backend/.env.production',
      required: true
    }
  ];

  let allExist = true;

  // Check frontend files
  frontendChecks.forEach(check => {
    if (fileExists(check.path)) {
      console.log(`${colors.green}✓ ${check.name} exists${colors.reset}`);
    } else {
      if (check.required) {
        console.log(`${colors.red}✗ ${check.name} missing (required)${colors.reset}`);
        allExist = false;
      } else {
        console.log(`${colors.yellow}⚠ ${check.name} not found (optional)${colors.reset}`);
      }
    }
  });

  console.log(''); // Empty line

  // Check backend files
  backendChecks.forEach(check => {
    if (fileExists(check.path)) {
      console.log(`${colors.green}✓ ${check.name} exists${colors.reset}`);
    } else {
      if (check.required) {
        console.log(`${colors.red}✗ ${check.name} missing (required)${colors.reset}`);
        allExist = false;
      } else {
        console.log(`${colors.yellow}⚠ ${check.name} not found (optional)${colors.reset}`);
      }
    }
  });

  return allExist;
}

// Function to check required environment variables
function checkEnvironmentVariables() {
  console.log(`\n${colors.blue}Checking environment variables...${colors.reset}\n`);

  // Check frontend environment variables
  console.log(`${colors.blue}Frontend environment variables:${colors.reset}`);
  const frontendEnvVars = ['VITE_API_URL'];
  const frontendEnvCheck = checkEnvFile('frontend/.env.production', frontendEnvVars);

  console.log(''); // Empty line

  // Check backend environment variables
  console.log(`${colors.blue}Backend environment variables:${colors.reset}`);
  const backendEnvVars = ['MONGO_URI', 'JWT_SECRET', 'FRONTEND_URL', 'PORT'];
  const backendEnvCheck = checkEnvFile('backend/.env.production', backendEnvVars);

  return frontendEnvCheck && backendEnvCheck;
}

// Function to check required scripts
function checkRequiredScripts() {
  console.log(`\n${colors.blue}Checking required scripts...${colors.reset}\n`);

  // Check frontend scripts
  console.log(`${colors.blue}Frontend scripts:${colors.reset}`);
  const frontendScripts = ['dev', 'build', 'preview'];
  const frontendScriptCheck = checkPackageScripts('frontend/package.json', frontendScripts);

  console.log(''); // Empty line

  // Check backend scripts
  console.log(`${colors.blue}Backend scripts:${colors.reset}`);
  const backendScripts = ['start', 'dev'];
  const backendScriptCheck = checkPackageScripts('backend/package.json', backendScripts);

  return frontendScriptCheck && backendScriptCheck;
}

// Function to check build capability
function checkBuildCapability() {
  console.log(`\n${colors.blue}Checking build capability...${colors.reset}\n`);

  try {
    // Check if npm is available
    const { execSync } = require('child_process');
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
    console.log(`${colors.green}✓ npm version ${npmVersion} available${colors.reset}`);

    // Check if node is available
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    console.log(`${colors.green}✓ Node.js version ${nodeVersion} available${colors.reset}`);

    return true;
  } catch (error) {
    console.log(`${colors.red}✗ npm or Node.js not available: ${error.message}${colors.reset}`);
    return false;
  }
}

// Main verification function
function verifyDeployment() {
  console.log(`${colors.blue}=== MANOX Deployment Verification ===${colors.reset}\n`);

  // Check configuration files
  const configCheck = checkConfigFiles();

  // Check environment variables
  const envCheck = checkEnvironmentVariables();

  // Check required scripts
  const scriptCheck = checkRequiredScripts();

  // Check build capability
  const buildCheck = checkBuildCapability();

  // Final summary
  console.log(`\n${colors.blue}=== Verification Summary ===${colors.reset}`);
  
  const checks = [
    { name: 'Configuration Files', passed: configCheck },
    { name: 'Environment Variables', passed: envCheck },
    { name: 'Required Scripts', passed: scriptCheck },
    { name: 'Build Capability', passed: buildCheck }
  ];

  let allPassed = true;
  checks.forEach(check => {
    const status = check.passed ? `${colors.green}PASSED${colors.reset}` : `${colors.red}FAILED${colors.reset}`;
    console.log(`${check.name}: ${status}`);
    if (!check.passed) allPassed = false;
  });

  console.log(''); // Empty line

  if (allPassed) {
    console.log(`${colors.green}✓ All checks passed! Your deployment is ready.${colors.reset}`);
    console.log(`${colors.blue}Next steps:${colors.reset}`);
    console.log('1. Push your code to GitHub');
    console.log('2. Deploy backend to Render');
    console.log('3. Deploy frontend to Vercel');
    console.log('4. Update environment variables with actual URLs');
  } else {
    console.log(`${colors.red}✗ Some checks failed. Please review the issues above.${colors.reset}`);
    console.log(`${colors.yellow}Check the deployment guide for detailed instructions.${colors.reset}`);
  }

  console.log(`\n${colors.blue}For detailed deployment instructions, see AUTOMATED_DEPLOYMENT_SCRIPT.md${colors.reset}`);
}

// Run verification
verifyDeployment();