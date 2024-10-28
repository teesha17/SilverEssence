const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  subcategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subCategories',
  }],
  imageUrl: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('categories', categorySchema);
