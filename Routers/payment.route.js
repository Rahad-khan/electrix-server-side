const { Router } = require('express');
const { getPaymentById, updatePaymentById } = require('../controllers/payment.controller');
const jwtVerify = require('../utils/jwtVerify');

const router = Router();

router.route('/:id')
    .get(jwtVerify, getPaymentById)
    .patch(jwtVerify, updatePaymentById)

module.exports = router;