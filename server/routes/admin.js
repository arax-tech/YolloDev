const express = require("express")
const bcrypt = require("bcryptjs")




const router = express.Router()

// Middleware
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")

// Models 
const User = require("../models/User");



router.post("/register", async (request, response) => {
    try {
        const check = await User.findOne({ email: request.body.email });
        console.log(request.body.email)
        if (check) {
            response.status(500).json({
                status: 500,
                message: "Email is already taken, Please use another email...",
            });
        } else {
            const user = await User.create(request.body);

            const token = await user.generateAuthToken();
            response.cookie("token", token, {
                expires: new Date(Date.now() + process.env.JWT_EXPIRE_TOKEN * 24 * 60 * 60 * 1000),
                httpOnly: true
            });

            const authuser = await User.findById(user._id).select('-password -tokens -resetPasswordExpire -resetPasswordToken');
            response.status(201).json({
                status: 201,
                message: "Registration Successfully...",
                user: authuser,
                token: token
            });
        }
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})

router.post('/login', async (request, response) => {

    try {

        const { email, password } = request.body;
        const loginUser = await User.findOne({ email: email });

        const isMatch = await bcrypt.compare(password, loginUser.password)

        if (isMatch) {

            const token = await loginUser.generateAuthToken();

            response.cookie("token", token, {
                expires: new Date(Date.now() + process.env.JWT_EXPIRE_TOKEN * 24 * 60 * 60 * 1000),
                httpOnly: true
            });
            // console.log("cookies" + request.cookies.jwt);

            const authuser = await User.findById(loginUser._id).select('-password -tokens -resetPasswordExpire -resetPasswordToken');

            response.status(200).json({
                status: 200,
                message: "Login Successfully...",
                user: authuser,
                token: token
            })
        }
        else {
            response.status(401).json({
                status: 422,
                message: "Invalid Email OR Password..."
            })
        }

    }
    catch (error) {
        response.status(401).json({
            status: 422,
            message: "Invalid Email OR Password..."
        })
    }
})


router.get("/profile", auth, admin, async (request, response) => {
    try {
        const _id = request.user.id;
        const user = await User.findById(_id).select('-password -tokens -resetPasswordExpire -resetPasswordToken -notification_settings -followers -following -role -new_user -otp');
        response.status(200).json({
            status: 200,
            user: user
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.patch("/profile", auth, admin, async (request, response) => {
    try {
        const _id = request.user.id;

        const admin = await User.findById(_id);
        if (request.file) {
            if (admin.image) {
                const oldImage = `images${admin.image.split("/images")[1]}`
                if (oldImage) {
                    fs.unlinkSync(path.join(__dirname, "../../public/" + oldImage))
                }
            }
            request.body.image = `${request.protocol}://${request.get('host')}/images/admin/${request.file.filename}`;
        } else {
            request.body.image = admin.image
        }
        await User.findByIdAndUpdate(_id, request.body,);
        response.status(200).json({
            status: 200,
            message: "Profile Updated Successfully..."
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }

});


router.get("/logout", auth, async (request, response) => {
    try {
        // Logout form current device
        request.user.tokens = request.user.tokens.filter((currentElement) => {
            return currentElement.token === request.token
        });
        // Logout from all devices
        // request.user.tokens = [];
        response.clearCookie("token");
        const user = await request.user.save();
        response.status(200).json({
            status: 200,
            message: "Logout Successfully..."
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            success: false,
            message: error.message
        });
    }
})




module.exports = router;