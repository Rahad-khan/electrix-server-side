const { Router } = require('express');
const userController = require('../controllers/user.controller');
const jwtVerify = require('../utils/jwtVerify');
const verifyAdmin = require('../utils/verifyAdmin');

const router = Router();

router.route('/admin/:email')
    .put(jwtVerify, verifyAdmin, userController.makeAdmin);

router.route('/')
    .get(jwtVerify, userController.getAllUser);




module.exports = router;