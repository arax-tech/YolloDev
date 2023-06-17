const express = require("express")
const cloudinary = require("cloudinary")

const router = express.Router()


// Middlewares
const auth = require("../../middleware/auth")
const admin = require("../../middleware/admin")


// Model 
const Badge = require("../../models/Badge")



// All Badges
router.get("/", auth, admin, async (request, response) => {
    try {
        const badges = await Badge.find().sort({ createAt: -1 });
        response.status(200).json({
            status: 200,
            badges: badges
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})



router.post("/store", auth, admin, async (request, response) => {
    try {
        await Badge.create(request.body);
        response.status(201).json({
            status: 201,
            message: 'Badge Create Successfully...'
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
        await Badge.findByIdAndDelete({ _id: request.params.id });
        response.status(200).json({
            status: 2020,
            message: "Badge Delete Successfuly..."
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
