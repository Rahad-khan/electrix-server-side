const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: [true, 'Review rating is required'],
        min: [0, 'Negative value not acceptable'],
        max: [5, 'Rating value should be equal or less than 5']
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


const Review = mongoose.model('Reviews', reviewSchema);

module.exports = Review;