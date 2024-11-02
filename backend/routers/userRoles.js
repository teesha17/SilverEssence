const express = require('express');
const userRouter = express.Router();

const {addOrder} = require('../controllers/ordersController');
const {registerUser,loginUser} = require('../controllers/userController');

userRouter.post('/addorder',addOrder);
userRouter.post('/registeruser',registerUser);
userRouter.post('/loginuser',loginUser);

module.exports = userRouter