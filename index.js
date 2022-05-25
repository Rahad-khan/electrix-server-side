const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



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
            return res.status(403).send({ mesaage: 'Forbidden Access' });
        }
        req.decode = decode;
        next();
    })
};


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
        const paidCollection = client.db("toolkit").collection("payment");
        const reviewCollection = client.db("toolkit").collection("reviews");
        //  Verify Admin
        const verifyAdmin = async (req, res, next) => {
            const requester = req.decode.email;
            const requesterDetails = await userCollection.findOne({ email: requester });
            if (requesterDetails.role === "admin") {
                next()
            } else {
                return res.status(403).send({ mesaage: 'Forbidden Access' });
            }
        };
        // Payment intent
        app.post("/create-payment-intent", jwtVerify, async (req, res) => {
            const { total } = req.body;
            const convertPrice = total * 100;
            // Create a PaymentIntent with the order amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                amount: convertPrice,
                currency: "usd",
                payment_method_types: ["card"],
            });
            res.send({
                clientSecret: paymentIntent.client_secret,
            });
        });

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
        });

        app.get('/reviews', async (req, res) => {
            const result = await (await reviewCollection.find().toArray()).reverse();
            res.send(result);
        });
        app.post('/reviews', jwtVerify, async (req, res) => {
            const doc = req.body;
            const result = await reviewCollection.insertOne(doc);
            res.send(result);
        });
        app.get('/user', jwtVerify, async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result);
        });
        app.get('/user/:email', jwtVerify, async (req, res) => {
            const email = req.params.email;
            const query = { email };
            const result = await userCollection.findOne(query);
            res.send(result);
        });

        app.put('/user/admin/:email', jwtVerify, verifyAdmin, async (req, res) => {
            const email = req.params.email;
            const filter = { email };
            const updateDoc = {
                $set: {
                    role: `admin`
                },
            };
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        });
        app.put('/updateProfile/:email', jwtVerify, async (req, res) => {
            const email = req.params.email;
            const doc = req.body;
            const filter = { email };
            const updateDoc = {
                $set: doc
            };
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        });

        app.get("/products", async (req, res) => {
            const result = await (await productCollection.find({}).toArray()).reverse();
            res.send(result);
        });
        // Insert a product by admin
        app.post("/products", jwtVerify, verifyAdmin, async (req, res) => {
            const doc = req.body;
            const result = await productCollection.insertOne(doc);
            res.send(result);
        });

        app.get("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await productCollection.findOne(query);
            res.send(result);
        });

        app.delete("/products/:id", jwtVerify, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await productCollection.deleteOne(filter);
            res.send(result);
        });

        app.get('/purchase', jwtVerify, verifyAdmin, async (req, res) => {
            const result = await purchaseCollection.find().toArray();
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
        app.get("/payment/:id", jwtVerify, async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await purchaseCollection.findOne(query);
            res.send(result);
        });
        app.patch("/payment/:id", jwtVerify, async (req, res) => {
            const id = req.params.id;
            const paymentDetails = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: {
                    status: 'paid',
                    transactionId: paymentDetails.transactionId
                },
            };
            const insertToPayment = await paidCollection.insertOne(paymentDetails);
            const result = await purchaseCollection.updateOne(filter, updateDoc);
            res.send(result);
        });
        app.patch("/shipment/:id", jwtVerify, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: {
                    status: 'shipped',
                },
            };
            const result = await purchaseCollection.updateOne(filter, updateDoc);
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