const mongoose = require('mongoose')

// Table Schema/Migration
const supportSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    attachment: { type: String, trim: true },
    createAt: { type: Date, default: Date.now }

})


// Model
const Support = new mongoose.model("Support", supportSchema);
module.exports = Support;