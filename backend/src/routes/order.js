const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.post('/', async (req,res) => {
  const { items, total, customer } = req.body;
  if (!items || !items.length) return res.status(400).json({ message: 'No items' });
  const o = new Order({ items, total, customer });
  await o.save();
  res.status(201).json(o);
});

router.get('/', async (req,res) => {
  const list = await Order.find().sort({ createdAt: -1 }).limit(50).lean();
  res.json(list);
});

module.exports = router;
