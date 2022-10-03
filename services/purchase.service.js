const Purchase = require("../models/Purchase")

exports.getPurchaseService = async () => {
    const purchases = await Purchase.find({});
    return purchases;
};
exports.postPurchaseService = async (data) => {
    const result = await Purchase.create(data)
    console.log(result);
    return result;
};
exports.findPurByEmailServices = async (email) => {
    const purchases = await Purchase.find({ email: email });
    return purchases;
};
exports.deletePurByIdServices = async (id) => {
    const result = await Purchase.deleteOne({ _id: id });
    return result;
};
exports.updatePurByIdServices = async (id) => {
    const result = await Purchase.updateOne({ _id: id }, { $set: { status: 'shipped' } });
    return result;
};

