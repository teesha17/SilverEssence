// EditSubcategory.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditSubcategory = () => {
  const [subcategoryName, setSubcategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { subcategoryId } = useParams(); 
  const token = localStorage.getItem('adminToken');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch subcategory details
    const fetchSubcategoryDetails = async () => {
      try {
        const response = await fetch(`https://silveressence.onrender.com/admin/getallsubcategories`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          'adminauthorize': token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch subcategory details');
        }

        const subcategories = await response.json();
        const subcategory = subcategories.find(sub => sub._id === subcategoryId); // Find the subcategory by ID

        if (subcategory) {
          setSubcategoryName(subcategory.subcategoryName);
          setSelectedCategory(subcategory.category._id); // Set the selected category ID
        } else {
          console.error('Subcategory not found');
        }
      } catch (error) {
        console.error('Error fetching subcategory details:', error);
      }
    };

    // Fetch all categories
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://silveressence.onrender.com/admin/getAllCategories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          'adminauthorize': token,
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

    fetchSubcategoryDetails();
    fetchCategories();
  }, [subcategoryId, token]);

  const handleUpdateSubcategory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://silveressence.onrender.com/admin/${subcategoryId}/subcategoryupdate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          'adminauthorize': token,
        },
        body: JSON.stringify({
          subcategoryName,
          category: selectedCategory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update subcategory');
      }

      alert('Subcategory updated successfully');
      navigate('/subcategories');
    } catch (error) {
      console.error('Error updating subcategory:', error);
    }
  };

  return (
    <div>
      <h2>Edit Subcategory</h2>
      <form onSubmit={handleUpdateSubcategory}>
        <div>
          <label>Subcategory Name:</label>
          <input
            type="text"
            value={subcategoryName || ''} // Ensure it is controlled
            onChange={(e) => setSubcategoryName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Select Category:</label>
          <select
            value={selectedCategory || ''} // Ensure it is controlled
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
        <button type="submit">Update Subcategory</button>
      </form>
    </div>
  );
};

export default EditSubcategory;
