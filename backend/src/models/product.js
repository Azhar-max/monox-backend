const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  title_en: String,
  title_it: String,
  description: String,
  description_en: String,
  description_it: String,
  images: [String],
  // price stored in EUR (site uses EUR only)
  price: { type: Number, required: true },
  category: String,
  category_it: String,
  subcategory: String,
  subcategory_it: String,
  stock: { type: Number, default: 0 },
  sku: String,
  tags: [String],
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);