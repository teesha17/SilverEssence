import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddAdmin.css'

const AddAdmin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const token = localStorage.getItem('adminToken');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://silveressence.onrender.com/api/adminRegister', {
                name,
                email,
                password,
            }, {
                headers: {
                    'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
                    'adminauthorize': token,
                },
            });
            alert('Admin registered successfully');
            navigate('/admins');
        } catch (error) {
            console.error('Error registering admin:', error);
        }
    };

    return (
        <div className="register-admin">
            <button onClick={() => navigate('/admins')} className="back-button">Back</button>
            <h2>Register New Admin</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="submit-button">Register</button>
            </form>
        </div>
    );
};

export default AddAdmin;
