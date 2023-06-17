const express = require("express")
const cloudinary = require("cloudinary")

const router = express.Router()


// Middlewares
const auth = require("../../middleware/auth")
const admin = require("../../middleware/admin")


// Model 
const Post = require("../../models/Post")
const Notification = require("../../models/Notification")
const Reaction = require("../../models/Reaction")
const PostReport = require("../../models/PostReport")
const Diamond = require("../../models/Diamond")


// All Posts
router.get("/", auth, admin, async (request, response) => {
    try {
        const posts = await Post.find().sort({ createAt: -1 }).populate("user", "first_name last_name username image").populate("comments.user", "first_name last_name image").populate("likes.user", "first_name last_name image");
        response.status(200).json({
            status: 200,
            posts: posts
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.get("/single/:id", auth, admin, async (request, response) => {
    try {
        const post = await Post.findById(request.params.id).populate("user", "first_name last_name image").populate("comments.user", "first_name last_name image").populate("likes.user", "first_name last_name image");
        response.status(200).json({
            status: 200,
            post: post
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.delete("/delete/:id", auth, admin, async (request, response) => {
    try {
        const posts = await Post.findByIdAndDelete({ _id: request.params.id });
        response.status(200).json({
            status: 2020,
            message: "Post Delete Successfuly..."
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})



module.exports = router;
