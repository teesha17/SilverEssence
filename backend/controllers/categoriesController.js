const Category = require('../models/categories');

const getAllCategories = async (req, res) => {
  try {
    const customHeader = req.headers['access-token'];
    
    if (!customHeader) {
      return res.status(400).json({ message: 'Access token not provided!' });
    }

    if (customHeader === process.env.accessToken) {
      const categories = await Category.find();
      res.status(200).json(categories);
    } else {
      return res.status(403).json({ message: 'Unauthorized access!' });
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Internal server error' });
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
  const { categoryName, imageUrl } = req.body;
  const { categoryId} = req.params;
  try {
    const customHeader = req.headers['access-token'];
    if (!customHeader) {
      throw new Error('Header not provided!');
    }
    const categorydetail = await Category.findById(categoryId);
    if (!categorydetail) {
      return res.status(404).json({ message: 'category not found' });
    }
    if (customHeader === process.env.accessToken) {
      if (categoryName) {
        categorydetail.categoryName = categoryName;
      }
      if (imageUrl) {
        categorydetail.imageUrl = imageUrl;
      }

      await categorydetail.save();

      return res.status(200).json({ message: 'category details updated successfully' });
    } else {
      throw new Error('Invalid header value!');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};



const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const customHeader = req.headers['access-token'];
    if (!customHeader) {
      throw new Error('Header not provided!');
    }
    if (customHeader === process.env.accessToken) {
      const categorydetail = await Category.findById(categoryId);
      if (!categorydetail) {
        return res.status(404).json({ message: 'category not found' });
      }

      await Category.findByIdAndDelete(categoryId);

      return res.status(200).json({ message: 'category deleted successfully' });
    } else {
      throw new Error('Invalid header value!');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  editCategory,
  deleteCategory,
};
