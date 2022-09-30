const Payment = require("../models/Payment");
const Purchase = require("../models/Purchase");

exports.getPaymentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const result = await Payment.findById(id);
        res.send(result);
    } catch (error) {
        res.send(error.message)
    }
};
exports.updatePaymentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const paymentDetails = req.body;
        const updateDoc = {
            $set: {
                status: 'paid',
                transactionId: paymentDetails.transactionId
            },
        };
        const insertToPayment = await Payment.create(paymentDetails);
        const result = await Purchase.updateOne({ _id: id }, updateDoc);
        res.send(result);
    } catch (error) {
        res.send(error.message)
    }
};