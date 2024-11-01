import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Items.css';

const Items = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchItems();
    fetchCategories();
    fetchSubcategories();
  }, []);

  // Fetch all items
  const fetchItems = async () => {
    try {
      const response = await fetch('https://silveressence.onrender.com/admin/getAllItems', {
        method: 'GET',
        headers: {
          'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          'adminauthorize': token,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

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
      console.log(data)
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch all subcategories
  const fetchSubcategories = async () => {
    try {
      const response = await fetch('https://silveressence.onrender.com/admin/getallsubcategories', {
        method: 'GET',
        headers: {
          'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          'adminauthorize': token,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setSubcategories(data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  // Delete an item
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://silveressence.onrender.com/admin/${id}/itemdelete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          'adminauthorize': token,
        },
      });
      if (!response.ok) throw new Error('Failed to delete item');
      alert('Item deleted successfully');
      fetchItems(); // Refresh items after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.categoryName : 'Unknown Category';
  };

  // Get subcategory name by ID
  const getSubcategoryName = (subcategoryId) => {
    const subcategory = subcategories.find((sub) => sub._id === subcategoryId);
    return subcategory ? subcategory.subcategoryName : 'Unknown Subcategory';
  };

  return (
    <div className="items-page">
      <button onClick={() => navigate('/')} className="back-button">Back</button>
      <h2>Items</h2>
      <button onClick={() => navigate('/additem')} className="add-item-button">Add New Item</button>
      <table className="items-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.itemName}</td>
              <td>{item.description}</td>
              <td>Rs. {item.price}</td>
              <td>{item.stockQuantity}</td>
              <td>{getCategoryName(item.category._id)}</td>
              <td>{getSubcategoryName(item.subCategory)}</td>
              <td>
                <button onClick={() => navigate(`/${item._id}/itemupdate`)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(item._id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Items;
