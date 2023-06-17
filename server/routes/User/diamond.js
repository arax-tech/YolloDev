const express = require("express")
const cloudinary = require("cloudinary")

const router = express.Router()


// Middlewares
const auth = require("../../middleware/auth")
const user = require("../../middleware/user")


// Model 
const Diamond = require("../../models/Diamond")
const User = require("../../models/User")


// My Diamonds
router.get("/", auth, user, async (request, response) => {
    try {
        const diamonds = await Diamond.find({ user: request.user.id }).populate("transactions.user", "first_name last_name image");
        response.status(200).json({
            status: 200,
            diamonds: diamonds
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


// 1 Minutes View Reward
router.get("/reward/store", auth, user, async (request, response) => {
    try {
        request.body.user = request.user.id;
        request.body.diamonds = 1;

        const diamond = await Diamond.findOne({ user: request.user.id });


        if (diamond) {
            await Diamond.findByIdAndUpdate(diamond._id, {
                $set: {
                    diamonds: diamond.diamonds + request.body.diamonds,
                }
            },
                {
                    new: true,
                    useFindAndModify: false
                });

        } else {
            await Diamond.create(request.body);
        }

        response.status(201).json({
            status: 201,
            message: "Reward Added Successfully..."
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})






router.post("/send", auth, user, async (request, response) => {
    try {

        const sender_id = request.user.id;
        const reciver_id = request.body.user;

        const senderDiamonds = await Diamond.findOne({ user: sender_id });

        if (request.body.diamonds > senderDiamonds.diamonds) {
            response.status(422).json({
                status: 422,
                message: `You Have only ${senderDiamonds.diamonds} Diamonds...`
            });
        } else {


            // Sender 
            await Diamond.findByIdAndUpdate(senderDiamonds._id, {
                $set: {
                    diamonds: senderDiamonds.diamonds - request.body.diamonds,
                }
            }, { new: true, useFindAndModify: false });


            senderDiamonds.transactions.push({
                user: reciver_id,
                diamonds: request.body.diamonds,
                type: "Sender",
                tranAt: new Date(Date.now()),
            });

            await senderDiamonds.save();


            // Reciver


            const reciverDiamonds = await Diamond.findOne({ user: reciver_id });

            if (reciverDiamonds) {

                await Diamond.findByIdAndUpdate(reciverDiamonds._id, {
                    $set: {
                        diamonds: reciverDiamonds.diamonds + request.body.diamonds,
                    }
                }, { new: true, useFindAndModify: false });

                reciverDiamonds.transactions.push({
                    user: sender_id,
                    diamonds: request.body.diamonds,
                    type: "Reciver",
                    tranAt: new Date(Date.now()),
                });

                await reciverDiamonds.save();

            } else {
                await Diamond.create({
                    user: reciver_id,
                    diamonds: request.body.diamonds,
                    transactions: {
                        user: sender_id,
                        diamonds: request.body.diamonds,
                        type: "Reciver",
                        tranAt: new Date(Date.now()),
                    }
                });
            }

            response.status(200).json({
                status: 200,
                message: "Diamond Transactions Successfully..."
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



module.exports = router;
