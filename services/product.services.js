const Products = require("../models/Products")

exports.getAllProductServices = async () => {
    const products = await Products.find({});
    return products;
};

exports.postProductServices = async (data) => {
    const newProduct = await Products.create(data);
    return newProduct;
};

exports.getProductByIdServices = async (id) => {
    const product = await Products.findById(id);
    return product;
};
exports.deleteByIdServices = async (id) => {
    const product = await Products.findByIdAndDelete(id).exec();
    return product;
};

