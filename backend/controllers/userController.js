const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { name, location, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      name,
      location,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// User login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password field
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
};

const Order = require('../models/orders');

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const customHeader = req.headers['access-token'];
    if (!customHeader) {
      throw new Error('Header not provided!');
    }
    if (customHeader === process.env.accessToken) {
      // Find the user by ID
      const userDetail = await User.findById(userId);
      if (!userDetail) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Delete all orders associated with the user
      await Order.deleteMany({ user: userId });

      // Delete the user
      await User.findByIdAndDelete(userId);

      return res.status(200).json({ message: 'User and associated orders deleted successfully' });
    } else {
      throw new Error('Invalid header value!');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
};
