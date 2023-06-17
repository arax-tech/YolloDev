const express = require("express")
const cloudinary = require("cloudinary")

const router = express.Router()


// Middlewares
const auth = require("../../middleware/auth")
const user = require("../../middleware/user")


// Model 
const Notification = require("../../models/Notification")
const User = require("../../models/User")


// My Notifications
router.get("/", auth, user, async (request, response) => {
    try {
        const notifications = await Notification.find({ user_id: request.user.id }).populate("user", "first_name last_name image").populate("post", "first_name last_name image");
        response.status(200).json({
            status: 200,
            notifications: notifications
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.post("/store", auth, user, async (request, response) => {
    try {

        request.body.user_id = request.user.id;
        await Notification.create(request.body);

        response.status(201).json({
            status: 201,
            message: "Notification Create Successfully..."
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})



router.get("/hide/:id", auth, async (request, response) => {
    try {

        await Notification.findByIdAndDelete(request.params.id);

        response.status(200).json({
            status: 200,
            message: "Notification Hide Successfully..."
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
