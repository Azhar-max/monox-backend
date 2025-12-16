const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Configure CORS with proper origin handling
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ 
  origin: frontendUrl,
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '5mb' }));

// Serve static files from the frontend public directory
app.use('/assets', express.static(path.join(__dirname, '..', 'frontend', 'public', 'assets')));

app.get('/api/health', (req,res) => res.json({ ok: true, now: new Date().toISOString() }));

// Railway health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

console.log('[DEBUG] Loading routes...');
try {
  app.use('/api/auth', require('./src/routes/auth'));
  console.log('[DEBUG] Auth route loaded');
} catch (e) {
  console.error('[ERROR] Failed to load auth route:', e);
}

try {
  app.use('/api/products', require('./src/routes/product'));
  console.log('[DEBUG] Products route loaded');
} catch (e) {
  console.error('[ERROR] Failed to load products route:', e);
}

try {
  app.use('/api/orders', require('./src/routes/order'));
  console.log('[DEBUG] Orders route loaded');
} catch (e) {
  console.error('[ERROR] Failed to load orders route:', e);
}

// Admin routes
try {
  app.use('/api/admin', require('./src/routes/admin'));
  console.log('[DEBUG] Admin route loaded');
} catch (e) {
  console.error('[ERROR] Failed to load admin route:', e);
}

app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

// Use PORT 5000 as default to match requirements
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/manox';

// Debug environment variables
console.log('[DEBUG] Environment variables:');
console.log('[DEBUG] MONGO_URI:', process.env.MONGO_URI ? 'SET' : 'NOT SET');
console.log('[DEBUG] PORT:', process.env.PORT || 'NOT SET, using default');
console.log('[DEBUG] NODE_ENV:', process.env.NODE_ENV || 'NOT SET');

async function start(){
  try {
    console.log('[DEBUG] Connecting to MongoDB at', MONGO);
    // Add proper connection options for MongoDB
    await mongoose.connect(MONGO, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of default 30s
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    console.log('[DEBUG] MongoDB connected');
    
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`[SUCCESS] Server running on http://0.0.0.0:${PORT}`);
      console.log(`[INFO] NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
      console.log(`[INFO] FRONTEND_URL: ${frontendUrl}`);
      console.log(`[INFO] MONGO_URI: ${MONGO.substring(0, 30)}...`);
    });
    
    // Handle server errors
    server.on('error', (err) => {
      console.error('[ERROR] Server error:', err);
      process.exit(1);
    });
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('[INFO] Shutting down gracefully...');
      await mongoose.connection.close();
      server.close(() => {
        console.log('[INFO] Server closed');
        process.exit(0);
      });
    });
  } catch(err) {
    console.error('[FATAL] MongoDB connection error:', err);
    process.exit(1);
  }
}

start();