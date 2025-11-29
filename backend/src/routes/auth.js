const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

router.post('/register', async (req,res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email exists' });
  const hash = await bcrypt.hash(password, 12);
  const user = new User({ name, email, passwordHash: hash });
  await user.save();
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
});

router.post('/login', async (req,res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(400).json({ message: 'Invalid' });
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ 
    token, 
    user: { 
      id: user._id, 
      name: user.name, 
      email: user.email,
      role: user.role 
    } 
  });
});

module.exports = router;
