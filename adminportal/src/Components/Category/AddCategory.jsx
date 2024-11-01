import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const token = localStorage.getItem('adminToken');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://silveressence.onrender.com/admin/addcategory', {
                categoryName,
                imageUrl
            }, {
                headers: {
                    'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
                    'adminauthorize': token,
                },
            });
            alert('Category Added successfully');
            navigate('/categories');
        } catch (error) {
            console.error('Error Adding Category:', error);
        }
    };

    return (
        <div className="register-admin">
            <button onClick={() => navigate('/categories')} className="back-button">Back</button>
            <h2>Add New Category</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label>Category Name:</label>
                    <input 
                        type="text" 
                        value={categoryName} 
                        onChange={(e) => setCategoryName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Imahe url:</label>
                    <input 
                        type="text" 
                        value={imageUrl} 
                        onChange={(e) => setImageUrl(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="submit-button">Register</button>
            </form>
        </div>
    );
};

export default AddCategory;
