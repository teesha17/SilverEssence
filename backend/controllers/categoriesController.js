const Category = require('../models/categories');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('subcategories'); 
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving categories', error });
  }
};

const addCategory = async (req, res) => {
  const { categoryName, imageUrl } = req.body;
  try {
    const newCategory = new Category({
      categoryName,
      imageUrl,
    });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error adding category', error });
  }
};

const editCategory = async (req, res) => {
  const { id } = req.params;
  const { categoryName, imageUrl } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { categoryName, imageUrl },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  editCategory,
  deleteCategory,
};
