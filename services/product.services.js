const Products = require("../models/Products")

exports.getAllProductServices = async () => {
    const products = await Products.find({});
    return products;
};

exports.postProductServices = async (data) => {
    const newProduct = await Products.create(data);
    return newProduct;
}