
const { getAllProductServices, postProductServices } = require("../services/product.services");


//         // Insert a product by admin
//         app.post("/products", jwtVerify, verifyAdmin, async (req, res) => {
//             const doc = req.body;
//             const result = await productCollection.insertOne(doc);
//             res.send(result);
//         });

//         app.get("/products/:id", async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: ObjectId(id) }
//             const result = await productCollection.findOne(query);
//             res.send(result);
//         });

//         app.delete("/products/:id", jwtVerify, verifyAdmin, async (req, res) => {
//             const id = req.params.id;
//             const filter = { _id: ObjectId(id) }
//             const result = await productCollection.deleteOne(filter);
//             res.send(result);
//         });
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
}