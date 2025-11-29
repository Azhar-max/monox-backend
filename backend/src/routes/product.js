const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req,res) => {
  const page = Math.max(1, parseInt(req.query.page||'1',10));
  // Set a higher default limit to accommodate all products
  // If no limit is specified, return all products (up to 500)
  const limit = req.query.limit ? Math.min(500, parseInt(req.query.limit||'20',10)) : 500;
  const skip = (page-1)*limit;
  const q = {};
  
  if (req.query.category) q.category = req.query.category;
  if (req.query.subcategory) q.subcategory = req.query.subcategory;
  if (req.query.featured) q.isFeatured = req.query.featured === 'true';
  
  const [items, total] = await Promise.all([
    Product.find(q).skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),
    Product.countDocuments(q)
  ]);
  
  res.json({ items, total, page, limit });
});

router.get('/:id', async (req,res) => {
  const p = await Product.findById(req.params.id).lean();
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
});

router.post('/', async (req,res) => {
  const p = new Product(req.body);
  await p.save();
  res.status(201).json(p);
});

module.exports = router;