import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/');
    };

    return (
        <div className="homepage-container">
            <div className="logout-container">
                <button onClick={handleLogout} className="logout-button">Admin Logout</button>
            </div>
            <div className="buttons-container">
                <Link to="/admins"><button className="nav-button">Admin</button></Link>
                <Link to="/users"><button className="nav-button">Users</button></Link>
                <Link to="/orders"><button className="nav-button">Orders</button></Link>
                <Link to='/items'><button className="nav-button">items</button></Link>
                <Link to='/categories'><button className="nav-button">Categories</button></Link>
            </div>
        </div>
    );
}

export default HomePage;
