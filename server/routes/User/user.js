const express = require("express")
const cloudinary = require("cloudinary")

const multer = require("multer")
const fs = require("fs")
const path = require("path")

const router = express.Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/users/profile')
    },
    filename: function (req, file, cb) {
        console.log(file)
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];

        cb(null, "user" + '-' + Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

// Middlewares
const auth = require("../../middleware/auth")
const user = require("../../middleware/user")


// Model 
const User = require("../../models/User")
const Badge = require("../../models/Badge")
const Diamond = require("../../models/Diamond")
const Notification = require("../../models/Notification")
const Reaction = require("../../models/Reaction")
const Post = require("../../models/Post")




router.get("/profile", auth, user, async (request, response) => {
    try {
        const _id = request.user.id;
        const tags = await Badge.find({ user: _id });

        const user = await User.findById(_id).select('-password -tokens -resetPasswordExpire -resetPasswordToken').populate('following.user', "image username last_name first_name ").populate('followers.user', "image username last_name first_name ").populate('badges.badge', 'type name icon color');

        const activePosts = await Post.find({ status: "Active", user: _id }).sort({ createAt: -1 }).populate("user", "first_name last_name image").populate("comments.user", "first_name last_name image");        

        const profilePostYouLikes = await Post.find({
            "$or": [
                { "likes": { $in: _id } },
                { "shares.user": { $in: _id } },
                { "comments.user": { $in: _id } },
            ]
        }).sort({ createAt: -1 }).populate("user", "first_name last_name image").populate("comments.user", "first_name last_name image");

        const profilePostLikes = await Post.find({ user: _id, numbersOfLikes: { $gt: 0 }, status: "InActive" }).populate("user", "first_name last_name image").populate("comments.user", "first_name last_name image");

        const diamonds = await Diamond.find({ user: _id }).sort({ createAt: -1 }).populate("transactions.user", "first_name last_name image");

        const notifications = await Notification.find({ user_id: _id, status: "Show" }).populate("user", "first_name last_name image").populate("post", "first_name last_name image");
        const reactions = await Reaction.find({ user: _id }).populate("reaction_user", "first_name last_name image");

        response.status(200).json({
            status: 200,
            user: user,
            tags: tags,
            diamonds: diamonds && diamonds[0],
            notifications: notifications,
            reactions: reactions,
            activePosts: activePosts,
            profilePostLikes: profilePostLikes,
            profilePostYouLikes: profilePostYouLikes,
            authToken: _id,
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})

// router.get("/profile", auth, user, async (request, response) => {
//     try {
//         const _id = request.user.id;
//         const user = await User.findById(_id);
//         response.status(200).json({
//             status: 200,
//             user: user,
//         });
//     }
//     catch (error) {
//         response.status(500).json({
//             status: 500,
//             message: error.message
//         });
//     }
// })

router.get("/single/:id", auth, user, async (request, response) => {

    try {
        const _id = request.params.id;
        const tags = await Badge.find({ user: _id });
        const user = await User.findById(_id).select('-password -tokens -resetPasswordExpire -resetPasswordToken').populate('following.user', "image username last_name first_name ").populate('followers.user', "image username last_name first_name ").populate('badges.badge', 'type name icon color');

        const activePosts = await Post.find({ status: "Active", user: _id }).sort({ createAt: -1 }).populate("user", "first_name last_name image").populate("comments.user", "first_name last_name image").populate("likes", "first_name last_name image");

        // const profilePostYouLikes = await Post.find({ likes: { $in: _id}}).sort({ createAt: -1 }).populate("user", "first_name last_name image").populate("comments.user", "first_name last_name image").populate("likes.", "first_name last_name image").populate("likes", "first_name last_name image");
        const profilePostYouLikes = await Post.find({
            "$or": [
                { "likes": { $in: _id} },
                { "shares.user": { $in: _id} },
                { "comments.user": { $in: _id} },
            ]
        }).sort({ createAt: -1 }).populate("user", "first_name last_name image").populate("comments.user", "first_name last_name image").populate("likes.", "first_name last_name image").populate("likes", "first_name last_name image");

        const profilePostLikes = await Post.find({ user: _id, numbersOfLikes: { $gt: 0 }, status: "InActive" }).sort({ numbersOfLikes: -1 }).populate("user", "first_name last_name image").populate("comments.user", "first_name last_name image").populate("likes.", "first_name last_name image").populate("likes", "first_name last_name image");
        ;
        const diamonds = await Diamond.find({ user: _id }).sort({ createAt: -1 }).populate("transactions.user", "first_name last_name image");

        const notifications = await Notification.find({ user_id: _id, status: "Show", user_id: { $ne: _id} }).populate("user", "first_name last_name image").populate("post", "first_name last_name image");
        const reactions = await Reaction.find({ user: _id }).populate("reaction_user", "first_name last_name image");

        response.status(200).json({
            status: 200,
            user: user,
            tags: tags,
            diamonds: diamonds && diamonds[0],
            notifications: notifications,
            reactions: reactions,
            activePosts: activePosts,
            profilePostLikes: profilePostLikes,
            profilePostYouLikes: profilePostYouLikes,
            authToken: request.user.id,
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})

router.put("/update/fcm/token", auth, user, async (request, response) => {

    try {
        const _id = request.user.id;
        console.log(request.body.fcm_token)
        await User.findByIdAndUpdate(_id, request.body, { new: true });
        response.status(200).json({
            status: 200,
            message: "FCM Token Updated Successfully..."
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }

});

router.put("/account/update", auth, user, async (request, response) => {

    try {
        const _id = request.user.id;
        await User.findByIdAndUpdate(_id, request.body, { new: true });
        response.status(200).json({
            status: 200,
            message: "Account Updated Successfully..."
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }

});

router.put("/account/update/notification/settings", auth, user, async (request, response) => {

    try {
        // console.log(request.body);
        const _id = request.user.id;
        await User.findByIdAndUpdate(_id, request.body, { new: true });
        response.status(200).json({
            status: 200,
            message: "Settings Update Successfully..."
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }

});

// old
// router.put("/profile", auth, user, upload.single('image'), async (request, response) => {

//     try {
//         console.log(request.body);
//         console.log(request.body.badges);
//         console.log(request.file);

//         // if (request.body.badges){
//         //     request.body?.badges?.map((badge) => (
//         //         console.log(badge)
//         //     ))
//         // }

//         const _id = request.user.id;
//         await User.findByIdAndUpdate({ _id }, {$pull: { badges: { } }}, { new: true });

//         const badges = [{ "badge": "641825c69f6622763f69ff55" }]
//         request.body.badges = badges;
//         const user = await User.findById(_id);
//         if (request.file) {
//             if (user.image && user.image.length > 0) {
//                 const oldImage = `users${user.image.split("/users")[1]}`
//                 fs.unlinkSync(path.join(__dirname, "../../public/" + oldImage))
//             }
//             request.body.image = `${request.protocol}://${request.get('host')}/users/profile/${request.file.filename}`;
//         } else {
//             request.body.image = user.image

//         }


//         await User.findByIdAndUpdate(_id, request.body, { new: true });


//         response.status(200).json({
//             status: 200,
//             message: "Profile Updated Successfully..."
//         });
//     }
//     catch (error) {
//         console.log(error)
//         response.status(500).json({
//             status: 500,
//             message: error.message
//         });
//     }

// });



router.put("/profile", auth, user, async (request, response) => {

    try {
        const _id = request.user.id;
        const { image, fileName } = request.body;
        const user = await User.findById(_id);

        const userNameCheck = await User.find({ username: request.body.username, role: "User" });

        if (user?.new_user === true) {
            if (userNameCheck.length > 0) {
                response.status(200).json({
                    status: 500,
                    message: "Username is already taken..."
                });
            } else {
                await User.findByIdAndUpdate({ _id }, { $pull: { badges: {} } }, { new: true });
                if (image) {
                    if (user.image && user.image.length > 0) {
                        const oldImage = `users${user.image.split("/users")[1]}`
                        fs.unlinkSync(path.join(__dirname, "../../public/" + oldImage))
                    }

                    let filePath = `../../public/users/profile/${fileName}`;
                    let buffer = Buffer.from(image.split(",")[1], 'base64');
                    fs.writeFileSync(path.join(__dirname, filePath), buffer);
                    request.body.image = `${request.protocol}://${request.get('host')}/users/profile/${fileName}`;

                } else {
                    request.body.image = user.image
                }

                request.body.new_user = false;
                await User.findByIdAndUpdate(_id, request.body, { new: true });
                response.status(200).json({
                    status: 200,
                    message: "Profile Updated Successfully..."
                });
            }

        } else {
            if (request?.body?.username !== user?.username) {
                if (userNameCheck.length > 0) {
                    response.status(200).json({
                        status: 500,
                        message: "Username is already taken..."
                    });
                }
            }
            else {
                await User.findByIdAndUpdate({ _id }, { $pull: { badges: {} } }, { new: true });
                if (image) {
                    if (user.image && user.image.length > 0) {
                        const oldImage = `users${user.image.split("/users")[1]}`
                        fs.unlinkSync(path.join(__dirname, "../../public/" + oldImage))
                    }

                    let filePath = `../../public/users/profile/${fileName}`;
                    let buffer = Buffer.from(image.split(",")[1], 'base64');
                    fs.writeFileSync(path.join(__dirname, filePath), buffer);
                    request.body.image = `${request.protocol}://${request.get('host')}/users/profile/${fileName}`;

                } else {
                    request.body.image = user.image
                }

                request.body.new_user = false;
                await User.findByIdAndUpdate(_id, request.body, { new: true });
                response.status(200).json({
                    status: 200,
                    message: "Profile Updated Successfully..."
                });
            }
        }


    }
    catch (error) {
        console.log(error)
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }

});


router.put("/follow", auth, user, async (request, response) => {

    try {
        const user_id = request.user.id;

        await User.findByIdAndUpdate({ _id: request.body.follow_user_id }, {
            $push: { followers: { user: user_id } }
        }, { new: true });

        await User.findByIdAndUpdate({ _id: user_id }, {
            $push: { following: { user: request.body.follow_user_id } }
        }, { new: true });

        response.status(200).json({
            status: 220,
            message: "Follow Successfully..."
        });
    }
    catch (error) {
        console.log(error)
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }

});


router.put("/unfollow", auth, user, async (request, response) => {

    try {
        const user_id = request.user.id;
        // console.log(request.body.unfollow_user_id)
        await User.findByIdAndUpdate({ _id: request.body.unfollow_user_id }, {
            $pull: { followers: { user: user_id } }
        }, { new: true });

        await User.findByIdAndUpdate({ _id: user_id }, {
            $pull: { following: { user: request.body.unfollow_user_id } }
        }, { new: true });

        response.status(200).json({
            status: 230,
            message: "Unfollow Successfully..."
        });
    }
    catch (error) {
        console.log(error)
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }

});

router.put("/unfollowFollowers", auth, user, async (request, response) => {

    try {
        const user_id = request.user.id;
        // console.log(user_id)
        // console.log(request.body.unfollow_user_id)
        await User.findByIdAndUpdate({ _id: user_id }, {
            $pull: { followers: { user: request.body.unfollow_user_id } }
        });

        await User.findByIdAndUpdate({ _id: request.body.unfollow_user_id }, {
            $pull: { following: { user: user_id } }
        }, { new: true });

        response.status(200).json({
            status: 230,
            message: "UnFollow Successfully..."
        });
    }
    catch (error) {
        console.log(error)
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }

});

router.get("/suggession", auth, user, async (request, response) => {

    try {
        const user_id = request.user.id;
        const users = await User.find({ role: "User" }).select('-password -tokens -resetPasswordExpire -resetPasswordToken').populate('following.user', "image username last_name first_name ").populate('followers.user', "image username last_name first_name ");

        response.status(200).json({
            status: 200,
            users: users
        });
    }
    catch (error) {
        console.log(error)
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }

});




module.exports = router;








