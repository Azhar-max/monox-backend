const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');
const adminAuth = require('../middleware/adminAuth');

// Admin dashboard - get statistics
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const [productCount, orderCount, userCount, recentOrders] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments(),
      Order.find().sort({ createdAt: -1 }).limit(5).lean()
    ]);

    res.json({
      stats: {
        products: productCount,
        orders: orderCount,
        users: userCount
      },
      recentOrders
    });
  } catch (err) {
    console.error('[ADMIN] Dashboard error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all products
router.get('/products', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const [products, total] = await Promise.all([
      Product.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Product.countDocuments()
    ]);
    
    res.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('[ADMIN] Products error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single product
router.get('/products/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('[ADMIN] Product error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create product
router.post('/products', adminAuth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('[ADMIN] Create product error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product
router.put('/products/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (err) {
    console.error('[ADMIN] Update product error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product
router.delete('/products/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('[ADMIN] Delete product error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all orders
router.get('/orders', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const [orders, total] = await Promise.all([
      Order.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Order.countDocuments()
    ]);
    
    res.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('[ADMIN] Orders error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single order
router.get('/orders/:id', adminAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    console.error('[ADMIN] Order error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status
router.put('/orders/:id', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (err) {
    console.error('[ADMIN] Update order error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const [users, total] = await Promise.all([
      User.find().select('-passwordHash').skip(skip).limit(limit).sort({ createdAt: -1 }),
      User.countDocuments()
    ]);
    
    res.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('[ADMIN] Users error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single user
router.get('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('[ADMIN] User error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user role
router.put('/users/:id', adminAuth, async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-passwordHash');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error('[ADMIN] Update user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;