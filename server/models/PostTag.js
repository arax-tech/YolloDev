const mongoose = require('mongoose')

// Table Schema/Migration
const posTagtSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Schema.ObjectId, ref: "Post", required: true },
    tags: [{ name: { type: String, required: true } }],
    createAt: { type: Date, default: Date.now }
})



// Model
const PostTag = new mongoose.model("PostTag", posTagtSchema);
module.exports = PostTag;