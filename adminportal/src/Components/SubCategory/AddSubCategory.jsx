import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSubCategory = () => {
  const [subcategoryName, setSubcategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const token = localStorage.getItem('adminToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://silveressence.onrender.com/admin/getallCategories', {
          headers: { 
          'Content-Type': 'application/json',
          'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          'adminauthorize': token,
          }
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [token]);

  const handleAddSubcategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/admin/addsubcategory', {
        subcategoryName,
        category: selectedCategory,
      }, {
        headers: 
        { 
          'Content-Type': 'application/json',
          'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          'adminauthorize': token
        }
      });
      alert('Subcategory added successfully');
      navigate('/subcategories');
    } catch (error) {
      console.error('Error adding subcategory:', error);
    }
  };

  return (
    <div>
      <h2>Add New Subcategory</h2>
      <form onSubmit={handleAddSubcategory}>
        <div>
          <label>Subcategory Name:</label>
          <input
            type="text"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Select Category:</label>
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
        <button type="submit">Add Subcategory</button>
      </form>
    </div>
  );
};

export default AddSubCategory;
