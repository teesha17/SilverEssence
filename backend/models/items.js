const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
    required: true,
  },
  subCategory:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subCategories',
    required: true
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('item', itemSchema);