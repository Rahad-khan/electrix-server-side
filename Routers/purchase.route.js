const { Router } = require('express');
const purchaseController = require('../controllers/purchase.controller');
const jwtVerify = require('../utils/jwtVerify');
const verifyAdmin = require('../utils/verifyAdmin');

const router = Router();

router.route('/')
    .get(jwtVerify, verifyAdmin, purchaseController.getPurchase)
    .post(purchaseController.postPurchase);

router.route('/:email')
    .get(jwtVerify, purchaseController.getPurchaseByEmail)
router.route('/:id')
    .delete(jwtVerify, purchaseController.deletePurchase)

module.exports = router;