import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Category.css'

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken'); 

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch all categories
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
      
      const data = await response.json();
      // Ensure data is an array before setting it
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error('Expected an array of categories but received:', data);
        setCategories([]); // Set to empty array if data is not an array
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]); // Set to empty array if there's an error
    }
  };
  

  // Delete a category
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://silveressence.onrender.com/admin/${id}/categorydelete`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          'adminauthorize': token,
        },
      });
      if (!response.ok) throw new Error('Failed to delete category');
      alert('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="category-page">
        <button onClick={() => navigate('/')} className="back-button">Back</button>
      <h2>Categories</h2>
      <button onClick={() => navigate('/addcategory')} className="add-category-button">Add New Category</button>
      <table className="category-table">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item) => (
            <tr key={item._id}>
              <td>{item.categoryName}</td>
              <td><img src={item.imageUrl} alt={item.categoryName} /></td>
              <td>
                <button onClick={() => navigate(`/${item._id}/categoryupdate`)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(item._id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
