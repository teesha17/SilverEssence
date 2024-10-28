import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './AdminEditPage.css';

const EditAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');
    const [admin, setAdmin] = useState({ name: '', email: '' }); 

    useEffect(() => {
        fetchAdmin();
    }, []);

    const fetchAdmin = async () => {
        try {
            const response = await axios.get('http://localhost:3000/admin/getAllAdmins', {
                headers: {
                    'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
                    'adminauthorize': token,
                },
            });

            const adminData = response.data.find(admin => admin._id === id);
            if (adminData) {
                setAdmin({ name: adminData.name, email: adminData.email });
            } else {
                console.error("Admin not found");
            }
        } catch (error) {
            console.error('Error fetching admin details:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdmin((prevAdmin) => ({
            ...prevAdmin,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://campussociety.onrender.com/admin/${id}/adminupdate`, admin, {
                headers: {
                    'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
                    'adminauthorize': token,
                },
            });
            alert('Admin updated successfully');
            navigate('/admins');
        } catch (error) {
            console.error('Error updating admin:', error);
        }
    };

    return (
        <div className="edit-admin-page">
            <button onClick={() => navigate('/admins')} className="back-button">Back</button>
            <h2>Edit Admin</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={admin.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={admin.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="save-button">Save</button>
                <button onClick={() => navigate('/admins')} className="cancel-button">Cancel</button>
            </form>
        </div>
    );
};

export default EditAdmin;
