import '@testing-library/jest-dom';

// Mock environment variables for testing
process.env.VITE_API_URL = 'http://localhost:3002/api';

// Mock import.meta.env for Vite environment variables
const mockImportMeta = {
  env: {
    VITE_API_URL: 'http://localhost:3002/api'
  }
};

// Create a mock for import.meta if it doesn't exist
if (typeof global.import === 'undefined') {
  global.import = {
    meta: mockImportMeta
  };
}