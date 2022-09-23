const { getAllProductServices, postProductServices, getProductById, deleteByIdServices, getProductByIdServices } = require("../services/product.services");


exports.getAllProducts = async (req, res, next) => {
    try {
        const result = await getAllProductServices();
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.postProduct = async (req, res, next) => {
    try {
        const result = await postProductServices(req.body);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await getProductByIdServices(id);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
exports.deleteProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteByIdServices(id);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
