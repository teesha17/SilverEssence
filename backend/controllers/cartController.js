const Cart = require('../models/cart'); 
const Item = require('../models/items');  

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;  // Assume `req.user` is set from authentication middleware
    const { productId, quantity } = req.body;

    // Check if the item exists
    const product = await Item.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Find or create a cart for the user
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (existingItemIndex > -1) {
      // If item exists, update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Else, add new item to cart
      cart.items.push({ product: productId, quantity });
    }

    // Update total price
    cart.totalPrice += product.price * quantity;
    cart.updatedAt = Date.now();

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update item quantity in cart
exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      const product = await Item.findById(productId);
      const oldQuantity = cart.items[itemIndex].quantity;
      
      // Update quantity and total price
      cart.items[itemIndex].quantity = quantity;
      cart.totalPrice += product.price * (quantity - oldQuantity);
      cart.updatedAt = Date.now();

      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
exports.removeCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      const product = await Item.findById(productId);
      const item = cart.items[itemIndex];

      // Update total price and remove item
      cart.totalPrice -= product.price * item.quantity;
      cart.items.splice(itemIndex, 1);
      cart.updatedAt = Date.now();

      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
