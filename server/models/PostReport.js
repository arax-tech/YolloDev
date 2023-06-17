const mongoose = require('mongoose')

// Table Schema/Migration
const postReportSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    post: { type: mongoose.Schema.ObjectId, ref: "Post" },
    reason: { type: String, required: true },
})



// Model
const PostReport = new mongoose.model("PostReport", postReportSchema);
module.exports = PostReport;