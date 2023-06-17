const express = require("express")
const cloudinary = require("cloudinary")

const router = express.Router()


// Middlewares
const auth = require("../../middleware/auth")
const admin = require("../../middleware/admin")


// Model 
const Support = require("../../models/Support")



// All Support
router.get("/", auth, admin, async (request, response) => {
    try {
        const supports = await Support.find().sort({ createAt: -1 });
        response.status(200).json({
            status: 200,
            supports: supports
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
        await Support.findByIdAndDelete({ _id: request.params.id });
        response.status(200).json({
            status: 2020,
            message: "Support Delete Successfuly..."
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
