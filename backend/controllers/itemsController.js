const Item = require('../models/items');

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('category'); 
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving items', error });
  }
};

const addItem = async (req, res) => {
  const { itemName, description, price, category,subCategory, stockQuantity, imageUrl } = req.body;
  try {
    const newItem = new Item({
      itemName,
      description,
      price,
      subCategory,
      category,
      stockQuantity,
      imageUrl,
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item', error });
  }
};

const updateItem = async (req, res) => {
  const { itemName,description,price,subCategory,category,stockQuantity,imageUrl, } = req.body;
  const { itemId} = req.params;
  try {
    const customHeader = req.headers['access-token'];
    if (!customHeader) {
      throw new Error('Header not provided!');
    }
    const itemdetail = await Item.findById(itemId);
    if (!itemdetail) {
      return res.status(404).json({ message: 'item not found' });
    }
    if (customHeader === process.env.accessToken) {
      if (itemName) {
        itemdetail.itemName = itemName;
      }
      if (imageUrl) {
        itemdetail.imageUrl = imageUrl;
      }
      if (description) {
        itemdetail.description = description;
      }
      if (price) {
        itemdetail.price = price;
      }
      if (subCategory) {
        itemdetail.subCategory = subCategory;
      }
      if (category) {
        itemdetail.category = category;
      }
      if (stockQuantity) {
        itemdetail.stockQuantity = stockQuantity;
      }

      await itemdetail.save();

      return res.status(200).json({ message: 'item details updated successfully' });
    } else {
      throw new Error('Invalid header value!');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const deleteItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const customHeader = req.headers['access-token'];
    if (!customHeader) {
      throw new Error('Header not provided!');
    }
    if (customHeader === process.env.accessToken) {
      const itemdetail = await Item.findById(itemId);
      if (!itemdetail) {
        return res.status(404).json({ message: 'item not found' });
      }

      await Item.findByIdAndDelete(itemId);

      return res.status(200).json({ message: 'item deleted successfully' });
    } else {
      throw new Error('Invalid header value!');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
};
