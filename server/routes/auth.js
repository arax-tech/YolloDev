const express = require("express")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")

const sendEmail = require("../include/sendEmail");



const router = express.Router()

// Middleware
const auth = require("../middleware/auth")

// Models 
const User = require("../models/User")
const Diamond = require("../models/Diamond")
const Badge = require("../models/Badge")
const Notification = require("../models/Notification")
const Reaction = require("../models/Reaction")
const Post = require("../models/Post")



router.post('/login', async (request, response) => {

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    try {

        const { phone, email, type, code } = request.body;
        console.log(code)

        // Phone Registration
        if (type == "phone") {
            const user = await User.findOne({ phone: phone });

            if (user) {
                // Update Existing OTP
                const _id = user.id;
                await User.findByIdAndUpdate(_id, { otp: otp, status: 'Active' });

                response.status(200).json({
                    status: 200,
                    phone: phone,
                    email: null,
                    type: type,
                    code: code,
                    message: "OTP Send Successfully...",
                });
            } else {
                // Save new User Phone
                await User.create({ phone: request.body.phone, otp: otp, status: 'Active' });
                const user = await User.findOne({ email: email });
                await Diamond.create({
                    user: user._id,
                    diamonds: 1000
                });
                response.status(200).json({
                    status: 200,
                    phone: phone,
                    email: null,
                    type: type,
                    code: code,
                    message: "OTP Send Successfully...",
                });
            }
        } else {
            // Email Registration
            const user = await User.findOne({ email: email });

            let message = '';
            let subject = '';

            if (user) {
                // Update Existing OTP
                message = `Dear ${user.first_name} ${user.last_name},<br/><br/>Welcome back to the world of YOLLO,<br/><br/>To ensure the security of your account, we require you to verify your Email. Please enter the following OTP (One-Time Password) in the verification screen to confirm your account:<br/><br/>OTP Code: <span style='font-weight:bold;'>${otp}</span><br/><br/>Please note that this OTP is valid for only 10 minutes. If you do not verify your account within this time frame, you will need to request a new OTP.<br/><br/>If you did not sign up for YOLLO, please ignore this email.<br/><br/>Best regards,<br/>The YOLLO Team.`;
                subject = "Your YOLLO Verification Code";
                const _id = user.id;
                await User.findByIdAndUpdate(_id, { otp: otp, status: 'Active' });
            } else {
                // Save new User Email
                await User.create({ email: request.body.email, otp: otp, status: 'Active' });

                subject = "Your YOLLO Login Verification Code";
                message = `Thank you for joining YOLLO, the new social media app that connects you with friends, family, and like-minded individuals from all around the world.<br/><br/>To ensure the security of your account, we require you to verify your Email. Please enter the following OTP (One-Time Password) in the verification screen to confirm your account:<br/><br/>OTP Code: <span style='font-weight:bold;'>${otp}</span><br/><br/>Please note that this OTP is valid for only 10 minutes. If you do not verify your account within this time frame, you will need to request a new OTP.<br/><br/>We're excited to have you as part of the YOLLO community and can't wait to see what you'll share with us.<br/><br/>If you did not sign up for YOLLO, please ignore this email.<br/><br/>Best regards,<br/>The YOLLO Team.`;


            }
            await sendEmail({
                email: email,
                subject: subject,
                message
            });





            response.status(200).json({
                status: 200,
                email: email,
                user: user,
                phone: otp,
                type: type,
                code: code,
                message: "OTP Send Successfully...",
            });
        }



    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        })
    }
})

router.post('/verify', async (request, response) => {

    try {

        const { otp, email, phone, type, code } = request.body;
        const loginUser = await User.findOne({ otp: otp });
        
        
        if (loginUser) {
            

            const token = await loginUser.generateAuthToken();

            response.cookie("token", token, {
                expires: new Date(Date.now() + process.env.JWT_EXPIRE_TOKEN * 24 * 60 * 60 * 1000),
                httpOnly: true
            });


            // Add Ref Diamonds
            if (code) {
                const codeUser = await User.findById(code);
                const user = await User.findOne({ email: email });
                console.log(user._id)
                // Reffered User Reward
                await Diamond.create({
                    user: user._id,
                    diamonds: 500,
                    transactions: {
                        user: user._id,
                        diamonds: "500",
                        type: "Sender",
                        tranAt: new Date(Date.now()),
                    }
                });


                // SignUp Reward
                await Diamond.create({
                    user: user._id,
                    diamonds: 1000,
                    transactions: {
                        user: user._id,
                        diamonds: "1000",
                        type: "Reciver",
                        tranAt: new Date(Date.now()),
                    }
                });

                // Referral Reward
                await Diamond.create({
                    user: codeUser._id,
                    diamonds: 500,
                    transactions: {
                        user: codeUser._id,
                        diamonds: "500",
                        type: "Sender",
                        tranAt: new Date(Date.now()),
                    }
                });

            } else {
                // SignUp Reward
                const user = await User.findOne({ otp: otp });
                // console.log(user)
                await Diamond.create({
                    user: user._id,
                    diamonds: 1000,
                    transactions: {
                        user: user._id,
                        diamonds: "1000",
                        type: "Reciver",
                        tranAt: new Date(Date.now()),
                    }
                });
            }


            
            response.status(200).json({
                status: 202,
                user: loginUser,
                message: "Login Successfully...",
            })
        }
        else {
            response.status(401).json({
                status: 401,
                email: email,
                phone: phone,
                type: type,
                message: "Invalid OTP..."
            })
        }

    }
    catch (error) {
        console.log(error)
        response.status(500).json({
            status: 500,
            message: error
        })
    }
})

router.get("/logout", auth, async (request, response) => {
    try {
        // Logout form current device
        request.user.tokens = request.user.tokens.filter((currentElement) => {
            return currentElement.token === request.token
        });

        // Logout from all devices
        // request.user.tokens = [];


        response.clearCookie("token");
        // console.log("Logout Successfuly");
        const user = await request.user.save();
        response.status(200).json({
            status: 203,
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




router.post("/disable/account", auth, async (request, response) => {
    try {
        console.log(request.user)
        const _id = request.user.id;

        await User.findByIdAndUpdate(_id, { status: "InActive" });

        request.user.tokens = request.user.tokens.filter((currentElement) => {
            return currentElement.token === request.token
        });

        response.clearCookie("token");
        await request.user.save();
        response.status(200).json({
            status: 204,
            message: "Account Disable Successfully..."
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


router.delete("/delete/account", auth, async (request, response) => {
    try {
        const _id = request.user.id;
        // request.user.tokens = request.user.tokens.filter((currentElement) => {
        //     return currentElement.token === request.token
        // });


        // response.clearCookie("token");
        // const user = await request.user.save();
        await User.findByIdAndDelete(_id);

        response.status(200).json({
            status: 205,
            message: "Account Delete Successfully..."
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