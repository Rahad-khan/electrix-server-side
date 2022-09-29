const { Router } = require('express');
const { getReviews, postReview } = require('../controllers/review.controller');
const jwtVerify = require('../utils/jwtVerify');

const router = Router();

router.route('/')
    .get(getReviews)
    .post(jwtVerify, postReview)

module.exports = router;