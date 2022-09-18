const express = require('express');
const productController = require('../controllers/product.controller');
const jwtVerify = require('../utils/jwtVerify');
const verifyAdmin = require('../utils/verifyAdmin');
const router = express.Router();

router.route('/')
    .get(productController.getAllProducts)
    .post(jwtVerify, verifyAdmin, productController.postProduct);

router.route('/:id')
    .get(productController.getProductById)
    .delete(jwtVerify, verifyAdmin, productController.deleteProductById)

module.exports = router;