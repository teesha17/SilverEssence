const Order = require('../models/orders');
const Item = require('../models/items'); 

const addOrder = async (req, res) => {
  try {
    const { user, items, shippingAddress, paymentMethod } = req.body;
    let totalAmount = 0;
    for (const orderedItem of items) {
      const item = await Item.findById(orderedItem.item);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      totalAmount += item.price * orderedItem.quantity;
    }
    const order = new Order({
      user,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });
    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('items.item', 'itemName price');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { orderStatus } = req.body;
  try {
    const customHeader = req.headers['access-token'];
    if (!customHeader) {
      throw new Error('Header not provided!');
    }
    const orderdetail = await Order.findById(orderId);
    if (!orderdetail) {
      return res.status(404).json({ message: 'order not found' });
    }
    if (customHeader === process.env.accessToken) {
        if (orderStatus) {
          orderdetail.orderStatus = orderStatus;
        }
        await orderdetail.save();
  
        return res.status(200).json({ message: 'order details updated successfully' });
      } else {
        throw new Error('Invalid header value!');
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
  addOrder,
  getAllOrders,
  updateOrderStatus,
};
