import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Users.css'

const Users = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('adminToken'); 
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://silveressence.onrender.com/admin/getAllUsers', {
                method: 'GET',
                headers: {
                    'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
                    'adminauthorize': token,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error fetching users:', errorText);
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://silveressence.onrender.com/admin/${id}/userdelete`, {
                method: 'DELETE',
                headers: {
                    'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
                    'adminauthorize': token,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error deleting user:', errorText);
                throw new Error('Failed to delete user');
            }

            alert('User deleted successfully');
            fetchUsers(); // Refresh the user list after deletion
        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
    };

    return (
        <div className="users-page">
            <button onClick={() => navigate('/')} className="back-button">Back</button>
            <h2>User Management</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.location}</td>
                            <td>
                                <button onClick={() => handleDelete(user._id)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
