const express = require("express")
const cloudinary = require("cloudinary")

const router = express.Router()


// Middlewares
const auth = require("../../middleware/auth")
const user = require("../../middleware/user")


// Model 
const User = require("../../models/User")
const Tag = require("../../models/Badge")



router.get("/", auth, user, async (request, response) => {
    try {
        const tags = await Tag.find();
        response.status(200).json({
            status: 200,
            tags: tags
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
        const user = request.user.id;
        const { name } = request.body;

        await Tag.create({ user, name });

        response.status(201).json({
            status: 201,
            message: "Tag Create Successfully..."
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }

});






module.exports = router;
