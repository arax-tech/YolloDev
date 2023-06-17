const express = require("express")
const router = express.Router()

// Middlewares
const auth = require("../../middleware/auth")
const user = require("../../middleware/user")


// Model 
const Post = require("../../models/Post")
const User = require("../../models/User")
const Tag = require("../../models/Badge")


// All Posts
router.get("/", auth, user, async (request, response) => {
    try {
        const posts = await Post.find({ numbersOfLikes: { $gt: 0 }, status: "Active" }).populate("user", "first_name last_name username image").limit(12);
        const users = await User.find({ role: "User" }).select('-password -tokens -resetPasswordExpire -notification_settings -role -otp -following -followers -resetPasswordToken').populate('following.user', "image username last_name first_name ");
        const badges = await Tag.find();

        // const badges = await Tag.aggregate(
        //     [
        //         {
        //             $lookup:
        //             {
        //                 from: 'users',
        //                 localField: "_id",
        //                 foreignField: "badges.badge",
        //                 as: 'badges'
        //             }
        //         },
        //         {
        //             $project:
        //             {
        //                 _id: 1,
        //                 name: 1,
        //                 used: { $size: "$badges" }
        //             }
        //         }
        //     ],
        //     function (err, result) {
        //         if (err) throw err;
        //         // console.log(result);
        //     });
        response.status(200).json({
            status: 200,
            posts: posts,
            users: users,
            badges: badges,
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})



router.get("/post/:keyword", auth, user, async (request, response) => {
    try {

        const { page = 1, limit = 2 } = request.query;

        const posts = await Post.find({
            "$or": [
                { caption: { $regex: request.params.keyword, $options: "i" } }
            ]
        }).sort({ createAt: -1 }).populate("user", "first_name last_name username image").populate("comments.user", "first_name last_name image");

        const count = await Post.countDocuments({
            "$or": [
                { caption: { $regex: request.params.keyword, $options: "i", } }
            ]
        });

        response.status(200).json({
            status: 200,
            posts: posts,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.get("/hashtag/:keyword", auth, user, async (request, response) => {
    try {

        const { page = 1, limit = 30 } = request.query;

        const posts = await Post.find({
            "$or": [
                { hashtag: { $regex: request.params.keyword, $options: "i" } }
            ]
        }).sort({ createAt: -1 }).populate("user", "first_name last_name username image").populate("comments.user", "first_name last_name image");

        const count = await Post.countDocuments({
            "$or": [
                { hashtag: { $regex: request.params.keyword, $options: "i", } }
            ]
        });

        response.status(200).json({
            status: 200,
            posts: posts,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.get("/user/:keyword", auth, user, async (request, response) => {
    try {


        const users = await User.find({
            "$or": [
                { first_name: { $regex: request.params.keyword, $options: "i" } },
                { last_name: { $regex: request.params.keyword, $options: "i" } },
                { username: { $regex: request.params.keyword, $options: "i" } },
            ]
        }).select('-password -tokens -resetPasswordExpire -notification_settings -role -otp -following -followers -resetPasswordToken').populate('following.user', "image username last_name first_name ");

        response.status(200).json({
            status: 200,
            users: users,
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.get("/badge/:keyword", auth, user, async (request, response) => {
    try {


        const badges = await Tag.find({
            "$or": [
                { name: { $regex: request.params.keyword, $options: "i" } }
            ]
        });

        response.status(200).json({
            status: 200,
            badges: badges,
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
