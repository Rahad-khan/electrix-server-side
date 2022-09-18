const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');
const port = process.env.PORT || 5000;

const app = require('./index');

// Database Connect
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Database connected successfully".red.bold)
});





// Server running port
app.listen(port, () => {
    console.log(`port is listening on ${port}`.yellow.bold)
})