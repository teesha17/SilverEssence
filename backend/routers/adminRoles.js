const express = require('express');
const adminRouter = express.Router();

const {getAllAdmins, updateAdmin, deleteAdmin } = require("../controllers/adminController")
const {getAllCategories, addCategory, editCategory, deleteCategory,} = require("../controllers/categoriesController")
const {getAllItems, addItem, updateItem, deleteItem,} = require("../controllers/itemsController")
const {getAllOrders, updateOrderStatus,} = require("../controllers/ordersController")
const {getAllUsers,deleteUser,} = require("../controllers/userController")
const {getAllSubcategories,addSubcategory,editSubcategory,deleteSubCategory} = require('../controllers/subcategoriesController')

adminRouter.get('/getAllAdmins',getAllAdmins);
adminRouter.put('/:adminId/adminupdate', updateAdmin);
adminRouter.delete('/:adminId/admindelete', deleteAdmin);
adminRouter.get("/getAllCategories",getAllCategories);
adminRouter.post('/addCategory',addCategory);
adminRouter.put('/:categoryId/categoryupdate',editCategory);
adminRouter.delete('/:categoryId/categorydelete',deleteCategory);
adminRouter.get("/getAllItems",getAllItems);
adminRouter.post('/addItem',addItem);
adminRouter.put('/:itemId/itemupdate',updateItem);
adminRouter.delete('/:itemId/itemdelete',deleteItem);
adminRouter.get('/getAllOrders',getAllOrders);
adminRouter.put('/:orderId/updateOrderStatus',updateOrderStatus);
adminRouter.get('/getAllUsers',getAllUsers);
adminRouter.delete('/:userId/userdelete',deleteUser);
adminRouter.get('/getallsubcategories',getAllSubcategories);
adminRouter.post('/addsubcategory',addSubcategory);
adminRouter.put('/:subCategoryId/subcategoryupdate',editSubcategory);
adminRouter.delete('/:subCategoryId/subcategorydelete',deleteSubCategory);

module.exports = adminRouter;

