const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    role: String,
    education: String,
    location: String,
    phone: String,
    location: String,
    linkedin: String
}, {
    timestamps: true,
    strict: false
});

const User = mongoose.model("Users", userSchema);

module.exports = User;