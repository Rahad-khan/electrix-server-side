const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    buyer: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'payment'
});


const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;