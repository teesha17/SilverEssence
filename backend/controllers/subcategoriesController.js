const Subcategory = require('../models/subCategories');
const mongoose = require('mongoose');

const getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('category'); 
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategories', error });
  }
};

const addSubcategory = async (req, res) => {
    const { subcategoryName, category } = req.body;
  
    try {
      const newSubcategory = new Subcategory({
        subcategoryName,
        category, // Remove ObjectId conversion
      });
      const savedSubcategory = await newSubcategory.save();
      res.status(201).json(savedSubcategory);
    } catch (error) {
      console.error('Error details:', error);
      res.status(500).json({
        message: 'Error adding subcategory',
        error: error.message || error,
      });
    }
  };
  
  
  

// Edit a subcategory by ID
const editSubcategory = async (req, res) => {
  const { subCategoryId } = req.params;
  const { subcategoryName, category } = req.body;

  try {
    const customHeader = req.headers['access-token'];
    if (!customHeader) {
      throw new Error('Header not provided!');
    }
    const subCategoryDetail = await Subcategory.findById(subCategoryId);
    if (!subCategoryDetail) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    if (customHeader === process.env.accessToken) {
        if (subcategoryName) {
          subCategoryDetail.subcategoryName = subcategoryName;
        }
        if (category) {
            subCategoryDetail.category = category;
        }
  
        await subCategoryDetail.save();
  
        return res.status(200).json({ message: 'subcategory details updated successfully' });
      } else {
        throw new Error('Invalid header value!');
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
};


const deleteSubCategory = async (req, res) => {
    const { subCategoryId } = req.params;
    try {
      const customHeader = req.headers['access-token'];
      if (!customHeader) {
        throw new Error('Header not provided!');
      }
      if (customHeader === process.env.accessToken) {
        const categorydetail = await Subcategory.findById(subCategoryId);
        if (!categorydetail) {
          return res.status(404).json({ message: 'category not found' });
        }
  
        await Subcategory.findByIdAndDelete(subCategoryId);
  
        return res.status(200).json({ message: 'category deleted successfully' });
      } else {
        throw new Error('Invalid header value!');
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  module.exports={getAllSubcategories,addSubcategory,editSubcategory,deleteSubCategory};