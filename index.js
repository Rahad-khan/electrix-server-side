const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");



//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@toolkits.jrid37h.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        await client.connect();
        const productCollection = client.db("toolkit").collection("products");


        app.get("/products", async (req, res) => {
            const result = await productCollection.find({}).toArray();
            res.send(result);
        });

        app.get("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await productCollection.findOne(query);
            res.send(result);
        });
    }
    finally {
        // console.log("object");
    }
}

run().catch(console.dir);
app.get('/', (req, res) => {
    res.send("Manufacturer Tool is Ready")
});

app.listen(port, () => {
    console.log("listen from port", port);
});