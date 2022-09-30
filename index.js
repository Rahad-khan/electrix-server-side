const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
// const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const productRoute = require('./Routers/product.route');
const userRouter = require('./Routers/user.route');
const reviewRoute = require('./Routers/review.route');
const purchaseRoute = require('./Routers/purchase.route');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



//middleware
app.use(cors());
app.use(express.json());


// async function run() {
//     try {
//         await client.connect();
//         const purchaseCollection = client.db("toolkit").collection("userPurchase");
//         const paidCollection = client.db("toolkit").collection("payment");
//         
//         // Payment intent
//         app.post("/create-payment-intent", jwtVerify, async (req, res) => {
//             const { total } = req.body;
//             const convertPrice = total * 100;
//             // Create a PaymentIntent with the order amount and currency
//             const paymentIntent = await stripe.paymentIntents.create({
//                 amount: convertPrice,
//                 currency: "usd",
//                 payment_method_types: ["card"],
//             });
//             res.send({
//                 clientSecret: paymentIntent.client_secret,
//             });
//         });




//         app.put('/updateProfile/:email', jwtVerify, async (req, res) => {
//             const email = req.params.email;
//             const doc = req.body;
//             const filter = { email };
//             const updateDoc = {
//                 $set: doc
//             };
//             const result = await userCollection.updateOne(filter, updateDoc);
//             res.send(result);
//         });


//         app.get("/payment/:id", jwtVerify, async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: ObjectId(id) }
//             const result = await purchaseCollection.findOne(query);
//             res.send(result);
//         });
//         app.patch("/payment/:id", jwtVerify, async (req, res) => {
//             const id = req.params.id;
//             const paymentDetails = req.body;
//             const filter = { _id: ObjectId(id) };
//             const updateDoc = {
//                 $set: {
//                     status: 'paid',
//                     transactionId: paymentDetails.transactionId
//                 },
//             };
//             const insertToPayment = await paidCollection.insertOne(paymentDetails);
//             const result = await purchaseCollection.updateOne(filter, updateDoc);
//             res.send(result);
//         });
//         app.patch("/shipment/:id", jwtVerify, verifyAdmin, async (req, res) => {
//             const id = req.params.id;
//             const filter = { _id: ObjectId(id) };
//             const updateDoc = {
//                 $set: {
//                     status: 'shipped',
//                 },
//             };
//             const result = await purchaseCollection.updateOne(filter, updateDoc);
//             res.send(result);
//         });
//     }
//     finally {
//         // console.log("object");
//     }
// }

// run().catch(console.dir);


/**
 * Firstly create schema
 * Then make an model for schema and pass model name and schema in its function
 * Then create instance from schema as object created from class
 */
app.get('/', (req, res) => {
    res.send("Manufacturer Tool is Ready")
});

app.use("/products", productRoute);

app.use('/user', userRouter);

app.use('/reviews', reviewRoute);

app.use('/purchase', purchaseRoute)

// ! next work to be complete purchase section

module.exports = app;