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

const jwtVerify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ mesaage: 'Unauthorized User' })
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decode) => {
        if (err) {
            return res.status(403).send({ mesaage: 'Forbidden Access' })
        }
        req.decode = decode;
        next();
    })
}

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
        const purchaseCollection = client.db("toolkit").collection("userPurchase");
        const userCollection = client.db("toolkit").collection("users");

        app.put('/user/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email };
            const options = { upsert: true };
            const updateDoc = {
                $set: user,
            };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
                expiresIn: '1d'
            });
            res.send({ result, token: accessToken })
        })

        app.get("/products", async (req, res) => {
            const result = await (await productCollection.find({}).toArray()).reverse();
            res.send(result);
        });

        app.get("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await productCollection.findOne(query);
            res.send(result);
        });

        app.post('/purchase', async (req, res) => {
            const purchaseDetails = req.body;
            const result = await purchaseCollection.insertOne(purchaseDetails);
            res.send(result);
        });
        app.get("/purchase/:email", jwtVerify, async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const result = await purchaseCollection.find(query).toArray();
            res.send(result);
        });
        app.delete("/purchase/:id", jwtVerify, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await purchaseCollection.deleteOne(filter);
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