const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  subcategoryName: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories', 
    required: true,
  }
});

module.exports = mongoose.model('subCategories', subcategorySchema);
