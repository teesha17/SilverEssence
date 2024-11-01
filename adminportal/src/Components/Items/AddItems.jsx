import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddItems.css';

const AddItem = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const token = localStorage.getItem('adminToken');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories and subcategories
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://silveressence.onrender.com/admin/getAllCategories', {
          method: 'GET',
          headers: {
            'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
            'adminauthorize': token,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [token]);

  useEffect(() => {
    // Fetch subcategories based on selected category
    const fetchSubcategories = async () => {
      if (!selectedCategory) return;

      try {
        const response = await fetch(`https://silveressence.onrender.com/admin/getallsubcategories`, {
          method: 'GET',
          headers: {
            'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
            'adminauthorize': token,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch subcategories');
        }

        const allSubcategories = await response.json();
        const filteredSubcategories = allSubcategories.filter(
          (sub) => sub.category._id === selectedCategory
        );
        setSubcategories(filteredSubcategories);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubcategories();
  }, [selectedCategory, token]);

  const handleAddItem = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://silveressence.onrender.com/admin/addItem', {
        method: 'POST',
        headers: {
          'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          'adminauthorize': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemName,
          description,
          price,
          stockQuantity,
          imageUrl,
          category: selectedCategory,
          subCategory: selectedSubCategory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      alert('Item added successfully');
      navigate('/items'); // Redirect to the items page
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="add-item-page">
      <h2>Add Item</h2>
      <form onSubmit={handleAddItem} className="add-item-form">
        <div className="form-group">
          <label>Item Name:</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Stock Quantity:</label>
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Subcategory:</label>
          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            required
          >
            <option value="">-- Select Subcategory --</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.subcategoryName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
