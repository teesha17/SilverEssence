import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css'

const AdminPage = () => {
    const [admins, setAdmins] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await fetch('https://silveressence.onrender.com/admin/getAllAdmins', {
                method: 'GET',
                headers: {
                    'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
                    'adminauthorize': token,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch admins');
            }

            const data = await response.json();
            setAdmins(data);
        } catch (error) {
            console.error('Error fetching admins:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/edit/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://silveressence.onrender.com/admin/${id}/admindelete`, {
                method: 'DELETE',
                headers: {
                    'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
                    'adminauthorize': token,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete admin');
            }

            alert('Admin deleted successfully');
            fetchAdmins(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting admin:', error);
        }
    };

    const handleRegisterNewAdmin = () => {
        navigate('/addadmin');
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="admin-page">
            <button onClick={handleBack} className="back-button">Back</button>
            <h2>Admin Management</h2>
            <button onClick={handleRegisterNewAdmin} className="register-button">Register New Admin</button>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin._id}>
                            <td>{admin.name}</td>
                            <td>{admin.email}</td>
                            <td>
                                <button onClick={() => handleEdit(admin._id)} className="edit-button">Edit</button>
                                <button onClick={() => handleDelete(admin._id)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
