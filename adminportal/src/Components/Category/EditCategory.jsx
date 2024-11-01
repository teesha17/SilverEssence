import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditCategory = () => {
    const { id } = useParams(); // Get category ID from URL parameters
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken'); // Get admin token from local storage
    const [category, setCategory] = useState({ categoryName: '', imageUrl: '' });

    useEffect(() => {
        fetchCategory(); // Fetch category data on component mount
    }, []);

    // Function to fetch category details
    const fetchCategory = async () => {
        try {
            const response = await fetch(`https://silveressence.onrender.com/admin/getAllCategories`, {
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

            const data = await response.json();
            const categoryData = data.find(cat => cat._id === id); // Find the category by ID
            if (categoryData) {
                setCategory({ categoryName: categoryData.categoryName, imageUrl: categoryData.imageUrl });
            } else {
                console.error("Category not found");
            }
        } catch (error) {
            console.error('Error fetching category details:', error);
        }
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const response = await fetch(`https://silveressence.onrender.com/admin/${id}/categoryupdate`, {
                method: 'PUT',
                headers: {
                    'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
                    'adminauthorize': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(category), // Send the updated category as JSON
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Update error details:', errorData);
                throw new Error('Failed to update category');
            }

            alert('Category updated successfully'); // Show success message
            navigate('/categories'); // Redirect to categories page
        } catch (error) {
            console.error('Error updating category:', error);
            alert('Failed to update category'); // Show error message
        }
    };

    return (
        <div className="edit-category-page">
            <button onClick={() => navigate('/categories')} className="back-button">Back</button>
            <h2>Edit Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Category Name:</label>
                    <input
                        type="text"
                        name="categoryName" // Match this to the state property
                        value={category.categoryName} // Controlled input
                        onChange={handleChange} // Handle change
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Image URL:</label>
                    <input
                        type="text" // Use text for image URL
                        name="imageUrl" // Match this to the state property
                        value={category.imageUrl} // Controlled input
                        onChange={handleChange} // Handle change
                        required
                    />
                </div>
                <button type="submit" className="save-button">Save</button>
                <button type="button" onClick={() => navigate('/categories')} className="cancel-button">Cancel</button>
            </form>
        </div>
    );
};

export default EditCategory;
