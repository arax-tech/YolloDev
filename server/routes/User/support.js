const express = require("express")

const router = express.Router()


// Middlewares
const auth = require("../../middleware/auth")
const user = require("../../middleware/user")


// Model 
const Support = require("../../models/Support")





router.post("/", auth, user, async (request, response) => {

    try {
        await Support.create(request.body);
        response.status(200).json({
            status: 200,
            message: "Thank you for contect us, we will get back to you asap..."
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
