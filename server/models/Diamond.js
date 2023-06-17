const mongoose = require('mongoose')

// Table Schema/Migration
const diamondSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    diamonds: { type: Number },
    transactions: [
        {
            user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
            diamonds: { type: Number },
            type: { type: String },
            tranAt: { type: Date, default: Date.now }
        }
    ],
})



// Model
const Diamond = new mongoose.model("Diamond", diamondSchema);
module.exports = Diamond;