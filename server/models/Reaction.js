const mongoose = require('mongoose')

// Table Schema/Migration
const reactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    reaction_user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    description: { type: String },
    createAt: { type: Date, default: Date.now }
})



// Model
const Reaction = new mongoose.model("Reaction", reactionSchema);
module.exports = Reaction;