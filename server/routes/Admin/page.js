const express = require("express")
const cloudinary = require("cloudinary")

const router = express.Router()


// Middlewares
const auth = require("../../middleware/auth")
const admin = require("../../middleware/admin")


// Model 
const Page = require("../../models/Page")



// All Pages
router.get("/", auth, admin, async (request, response) => {
    try {
        const pages = await Page.find().sort({ createAt: -1 });
        response.status(200).json({
            status: 200,
            pages: pages
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
        await Page.create(request.body);
        response.status(201).json({
            status: 201,
            message: 'Page Create Successfully...'
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
        const page = await Page.findById({ _id: request.params.id });
        response.status(200).json({
            status: 2020,
            page: page
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.get("/single/by/:slug", async (request, response) => {
    try {
        const page = await Page.find({ slug: request.params.slug });
        response.status(200).json({
            status: 2020,
            page: page[0]
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})

router.put("/update/:id", auth, admin, async (request, response) => {
    try {
        await Page.findByIdAndUpdate(request.params.id, request.body);
        response.status(201).json({
            status: 201,
            message: 'Page Update Successfully...'
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
        await Page.findByIdAndDelete({ _id: request.params.id });
        response.status(200).json({
            status: 2020,
            message: "Page Delete Successfuly..."
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
