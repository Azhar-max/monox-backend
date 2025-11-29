const mongoose = require('mongoose');

const OrderItem = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  title: String,
  price: Number,
  qty: Number
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  items: [OrderItem],
  total: Number,
  shipping: Number,
  customer: { 
    name: String, 
    email: String,
    phone: String,
    address: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);