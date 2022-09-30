const purchaseService = require("../services/purchase.service")

exports.getPurchase = async (req, res, next) => {
    try {
        const result = await purchaseService.getPurchaseService();
        res.send(result);
    } catch (error) {
        res.send((error.message))
    }
};
exports.postPurchase = async (req, res, next) => {
    try {
        const purchaseDetails = req.body;
        const result = await purchaseService.postPurchaseService(purchaseDetails);
        res.send(result);
    } catch (error) {
        res.send((error.message))
    }
};
exports.getPurchaseByEmail = async (req, res, next) => {
    try {
        const { email } = req.params;
        const result = await purchaseService.findPurByEmailServices(email);
        res.send(result);
    } catch (error) {
        res.send((error.message))
    }
};
exports.deletePurchase = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await purchaseService.deletePurByIdServices(id);
        res.send(result);
    } catch (error) {
        res.send((error.message))
    }
};
exports.shipmentPurchase = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await purchaseService.updatePurByIdServices(id);
        res.send(result);
    } catch (error) {
        res.send((error.message))
    }
};

