const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({

}, {
    timestamps: true,
    strict: false,
    collection: 'userPurchase'
});


const Purchase = mongoose.model('userPurchase', purchaseSchema);

module.exports = Purchase;