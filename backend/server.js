/**
 * Minimal modern backend for MANOX
 */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json({ limit: '5mb' }));

// Serve static files from the frontend public directory
app.use('/assets', express.static(path.join(__dirname, '..', 'frontend', 'public', 'assets')));

app.get('/api/health', (req,res) => res.json({ ok: true, now: new Date().toISOString() }));

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

const PORT = process.env.PORT || 3002;
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/manox';
async function start(){
  try {
    console.log('[DEBUG] Connecting to MongoDB at', MONGO);
    await mongoose.connect(MONGO, { });
    console.log('[DEBUG] MongoDB connected');
    
    const server = app.listen(PORT, () => {
      console.log(`[SUCCESS] Server running on http://localhost:${PORT}`);
    });
    
    server.on('error', (err) => {
      console.error('[ERROR] Server error:', err);
      process.exit(1);
    });
  } catch(err) {
    console.error('[FATAL]', err);
    process.exit(1);
  }
}
start();