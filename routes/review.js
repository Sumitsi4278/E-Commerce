const express = require('express');
const Review = require('../models/review');
const Product = require('../models/product');
const router = express.Router();
const {validateReview, isLoggedIn, isBuyer} = require('../middleware');
const { reviewUpload } = require('../controller/review')

router.post('/products/:productId/review',validateReview, isLoggedIn, isBuyer, reviewUpload)

module.exports = router;