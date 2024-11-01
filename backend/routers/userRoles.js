const express = require('express');
const userRouter = express.Router();

const {addOrder} = require('../controllers/ordersController')

userRouter.post('/addorder',addOrder);

module.exports = userRouter