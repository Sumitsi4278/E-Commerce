const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { isLoggedIn } = require('../middleware');
const { addToCart, quantityremoveFromCart, deleteFromcart, showCart } = require('../controller/cart');

router.post('/user/:productId/add',isLoggedIn, addToCart)

router.post('/user/:productId/remove', isLoggedIn, quantityremoveFromCart)

router.delete('/user/:productId',isLoggedIn, deleteFromcart)

router.get('/user/cart',isLoggedIn, showCart)

module.exports = router;