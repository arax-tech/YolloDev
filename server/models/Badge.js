const mongoose = require('mongoose')

// Table Schema/Migration
const badgeSchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true },
    createAt: { type: Date, default: Date.now }

})


// Model
const Badge = new mongoose.model("Badge", badgeSchema);
module.exports = Badge;