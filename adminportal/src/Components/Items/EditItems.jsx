// EditItem.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditItems = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const { itemId } = useParams();
  console.log(itemId)
  const token = localStorage.getItem('adminToken'); 
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch item details
    const fetchItemDetails = async () => {
        try {
          const response = await fetch(`https://silveressence.onrender.com/admin/getAllItems`, {
            method: 'GET',
            headers: {
              'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
              'adminauthorize': token,
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch item details');
          }
      
          const items = await response.json();
          const item = items.find((item) => item._id === itemId);
      
          if (!item) {
            throw new Error('Item not found');
          }
          setItemName(item.itemName);
          setDescription(item.description);
          setPrice(item.price);
          setStockQuantity(item.stockQuantity);
          setImageUrl(item.imageUrl);
          setSelectedCategory(item.category._id);
          setSelectedSubCategory(item.subCategory);
      
        } catch (error) {
          console.error('Error fetching item details:', error);
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

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    // Fetch all subcategories
    const fetchSubCategories = async () => {
      try {
        const response = await fetch('https://silveressence.onrender.com/admin/getallsubcategories', {
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

        const subCategoriesData = await response.json();
        setSubCategories(subCategoriesData);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchItemDetails();
    fetchCategories();
    fetchSubCategories();
  }, [itemId, token]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory(''); // Reset subcategory when category changes
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://silveressence.onrender.com/admin/${itemId}/itemupdate`, {
        method: 'PUT',
        headers: {
          'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          'adminauthorize': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemName,
          description,
          price,
          category: selectedCategory,
          subCategory: selectedSubCategory,
          stockQuantity,
          imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      alert('Item updated successfully');
      navigate('/items');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Filter subcategories based on selected category
  const filteredSubCategories = subCategories.filter(
    (sub) => sub.category._id === selectedCategory
  );

  return (
    <div>
      <h2>Edit Item</h2>
      <form onSubmit={handleUpdateItem}>
        <div>
          <label>Item Name:</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Stock Quantity:</label>
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Select Category:</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
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
        <div>
          <label>Select Subcategory:</label>
          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            required
          >
            <option value="">-- Select Subcategory --</option>
            {filteredSubCategories.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.subcategoryName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default EditItems;
