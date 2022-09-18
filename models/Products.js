const { default: mongoose } = require("mongoose");


// Create Schema
const productSchema = mongoose.Schema({
    picture: {
        type: String,
        required: [true, "Please Provide a picture link address"]
    },
    minimum_order: {
        type: Number,
        required: true,
        min: [1, "Minimum order should be higher than at least 1"]
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Qauntity can't be negative"]
    },
    price: {
        type: Number,
        required: true,
        min: [1, "Price can't be negative"]
    },

    name: {
        type: String,
        required: [true, "Please Provide a name for the product"],
        trim: true,
        unique: true,
        minLength: [3, "name must be at least 3 charecter"],
        maxLength: [100, "Name is too large"],
    },
    description: {
        type: String,
        required: true
    }
})

// Create Model
// here model function automatically create lowercase and plural collection name to database
const Products = mongoose.model('Products', productSchema);

module.exports = Products;