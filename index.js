const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
const mongoose = require('mongoose');
const productRoute = require('./Routers/product.route');
const userRouter = require('./Routers/user.route');
const reviewRoute = require('./Routers/review.route');
const purchaseRoute = require('./Routers/purchase.route');
const paymentRoute = require('./Routers/payment.route');
const jwtVerify = require('./utils/jwtVerify');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



//middleware
app.use(cors());
app.use(express.json());


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

app.get('/', (req, res) => {
    res.send("Manufacturer Tool is Ready")
});

app.use("/products", productRoute);

app.use('/user', userRouter);

app.use('/reviews', reviewRoute);

app.use('/purchase', purchaseRoute);

app.use('/payment', paymentRoute)

module.exports = app;