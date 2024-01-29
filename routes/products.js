const express = require('express');
const Product = require('../models/product');
const Review = require('../models/review');
const router = express.Router();
const { validateProduct, isLoggedIn, isSeller, isAuthor } = require('../middleware');
const { showAllProducts, newProduct, createProduct, showProduct, editProduct, updatedProduct, deleteProduct } = require('../controller/products');

router.get('/products', showAllProducts);

router.get('/products/new', isLoggedIn, isSeller, newProduct)

router.post('/products', isSeller, validateProduct, createProduct)

router.get('/products/:id', showProduct)

router.get('/products/:id/edit', isLoggedIn, isSeller, isAuthor, editProduct)

router.patch('/products/:id', isLoggedIn , isSeller, validateProduct, isAuthor, updatedProduct)

router.delete('/products/:id', isLoggedIn, isSeller, isAuthor, deleteProduct)
module.exports = router;
