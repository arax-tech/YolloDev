const mongoose = require('mongoose')

// Table Schema/Migration
const notificationSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId, ref: "User" },
    post: { type: mongoose.Schema.ObjectId, ref: "Post" },
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, default: "Show" },
    createdAt: { type: Date, default: Date.now },
})



// Model
const Notification = new mongoose.model("Notification", notificationSchema);
module.exports = Notification;