import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SubCategory.css'

const Subcategories = () => {
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get('https://silveressence.onrender.com/admin/getallsubcategories', {
          headers: { 
          'Content-Type': 'application/json',
          'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          'adminauthorize': token, 
        }
        });
        setSubcategories(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };
    fetchSubcategories();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://silveressence.onrender.com/admin/${id}/subcategorydelete`, {
        headers: { 
          'Content-Type': 'application/json',
          'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          'adminauthorize': token, 
        }
      });
      setSubcategories(subcategories.filter((subcategory) => subcategory._id !== id));
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    }
  };

  return (
    <div>
        <button onClick={() => navigate('/')} className="back-button">Back</button>
      <h2>Subcategories</h2>
      <button onClick={() => navigate('/addsubcategory')}>Add New Subcategory</button>
      <table>
        <thead>
          <tr>
            <th>Subcategory Name</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((subcategory) => (
            <tr key={subcategory._id}>
              <td>{subcategory.subcategoryName}</td>
              <td>{subcategory.category?.categoryName}</td>
              <td>
                <button  className='btn1' onClick={() => navigate(`/${subcategory._id}/subcategoryupdate`)}>Edit</button>
                <button  className='btn2' onClick={() => handleDelete(subcategory._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subcategories;
