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
  const { itemName, description, price, category, stockQuantity, imageUrl } = req.body;
  try {
    const newItem = new Item({
      itemName,
      description,
      price,
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
  const { id } = req.params;
  const { itemName, description, price, category, stockQuantity, imageUrl } = req.body;
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { itemName, description, price, category, stockQuantity, imageUrl },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error });
  }
};

module.exports = {
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
};
