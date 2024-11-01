import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './Orders.css'

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState('');
  const token = localStorage.getItem('adminToken')
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await fetch('https://silveressence.onrender.com/admin/getAllOrders', {
        method: 'GET',
        headers: {
            'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
            'adminauthorize': token,
            'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      console.log(data)
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Update order status
  const handleUpdateStatus = async (id) => {
    try {
      const response = await fetch(`https://silveressence.onrender.com/admin/${id}/updateOrderStatus`, {
        method: 'PUT',
        headers: {
          'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          'adminauthorize': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderStatus: statusUpdate }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      alert('Order status updated successfully');
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="orders-page">
      <button onClick={() => navigate('/')} className="back-button">Back</button>
      <h2>Orders Management</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Items</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user?.name}</td>
              <td>{order.user?.email}</td>
              <td>
                {order.items.map((item, index) => (
                  <div key={item._id}>
                    <strong>{item.item.itemName}</strong> - ${item.item.price} x {item.quantity}
                  </div>
                ))}
              </td>
              <td>{order.orderStatus}</td>
              <td>
                <input
                  type="text"
                  placeholder="New Status"
                  value={statusUpdate}
                  onChange={(e) => setStatusUpdate(e.target.value)}
                />
                <button onClick={() => handleUpdateStatus(order._id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
