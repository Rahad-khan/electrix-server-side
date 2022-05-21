const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");



//middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Manufacturer Tool is Ready")
});

app.listen(port, () => {
    console.log("listen from port", port);
});