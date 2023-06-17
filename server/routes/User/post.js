const express = require("express")

const axios = require("axios")



const fs = require("fs")
const path = require("path")

const router = express.Router()

// Middlewares
const auth = require("../../middleware/auth")
const user = require("../../middleware/user")


// Model 
const User = require("../../models/User")
const Post = require("../../models/Post")
const Notification = require("../../models/Notification")
const Reaction = require("../../models/Reaction")
const PostReport = require("../../models/PostReport")
const Diamond = require("../../models/Diamond")



const SendPostPushNotification = async (post_id, name, title) => {

    post = await Post.findById(post_id);
    post_owner = await User.findById(post.user.toString());

    const fcm_token = post_owner?.fcm_token;
    const url = `https://fcm.googleapis.com/fcm/send`;
    // console.log(fcm_token)
    const body = {
        to: fcm_token,
        notification: {
            title: name,
            body: title,
        },
    }
    try {
        const token = "Bearer AAAARhKdOl0:APA91bGOsRKmedUSBCjmpRwL_en35boFnzwyIZuI1qaqGpviCaex4svPXgO7QnizzDRoFMeKzEgKC4wipU5A-QQDbNuxryPQApiIiJQwWlg6CJhFegLuYdUeSAaVT05YzUjC3iyLa3ds";
        const { data } = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        console.log(data)
    } catch (error) {
        console.log(error.message)
    }
}

// All Posts
router.get("/", auth, user, async (request, response) => {
    try {

        const { page = 1, limit = 2 } = request.query;

        const posts = await Post.find({ status: "Active" }).sort({ createAt: -1 }).populate("user", "first_name last_name username image").populate("comments.user", "first_name last_name image").populate("likes.user", "first_name last_name image")
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Post.countDocuments({ status: "Active" });
        // console.log(count)
        response.status(200).json({
            status: 200,
            posts: posts,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})




router.get("/single/:id", auth, user, async (request, response) => {
    try {
        const post = await Post.findById(request.params.id).populate("user", "first_name last_name image").populate("comments.user", "first_name last_name image").populate("likes.user", "first_name last_name image");
        response.status(200).json({
            status: 200,
            post: post
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


// My Following Posts

router.get("/my-following-posts", auth, user, async (request, response) => {
    try {
        // console.log(request.user.following[0].user.toString())
        // { user: { $in: request.user.following[0].user.toString() } }
        const posts = await Post.find({ user: { $in: [request.user.following.map((user) => (user.user.toString()))] } }).sort({ createAt: -1 }).populate("user", "first_name last_name image").populate("comments.user", "first_name last_name image").populate("likes.user", "first_name last_name image");
        response.status(200).json({
            status: 200,
            posts: posts
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
        const { images } = request.body;

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const fileName = `${Date.now()}.jpg`;
            let filePath = `../../public/images/posts/${fileName}`;
            let buffer = Buffer.from(images[i].split(",")[1], 'base64');
            fs.writeFileSync(path.join(__dirname, filePath), buffer);
            imagesLinks.push({
                image: `${request.protocol}://${request.get('host')}/images/posts/${fileName}`
            });
        }

        // console.log(imagesLinks)

        request.body.images = imagesLinks;
        request.body.user = request.user.id;

        const createPost = new Post(request.body);
        await createPost.save();

        // Diamonds  
        const diamond = await Diamond.findOne({ user: request.user.id });

        await Diamond.findByIdAndUpdate(diamond._id, {
            $set: {
                diamonds: diamond.diamonds + 60
            }
        });

        response.status(201).json({
            status: 201,
            message: "Post Create Successfully..."
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.put("/update/:id", auth, user, async (request, response) => {
    try {
        const _id = request.params.id;

        const post = await Post.findById(_id);
        for (let img = 0; img < post?.images?.length; img++) {
            const oldImage = `images/posts${post?.images[img]?.image.split("/posts")[1]}`
            fs.unlinkSync(path.join(__dirname, "../../public/" + oldImage))
        }


        const { images } = request.body;
        const imagesLinks = [];
        for (let i = 0; i < images.length; i++) {
            const fileName = `${Date.now()}.jpg`;
            let filePath = `../../public/images/posts/${fileName}`;
            let buffer = Buffer.from(images[i].split(",")[1], 'base64');
            fs.writeFileSync(path.join(__dirname, filePath), buffer);
            imagesLinks.push({
                image: `${request.protocol}://${request.get('host')}/images/posts/${fileName}`
            });
        }

        request.body.images = imagesLinks;
        request.body.user = request.user.id;
        await Post.findByIdAndUpdate(_id, request.body, {
            new: true,
            useFindAndModify: false
        });

        response.status(200).json({
            status: 200,
            message: "Post Update Successfully..."
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.post("/remove/diamonds", auth, user, async (request, response) => {
    try {

        const posts = await Post.find();

        posts?.map(async (post) => (
            await Post.findByIdAndUpdate(post._id, {
                $set: {
                    diamonds: post.diamonds > 0 ? post.diamonds - 1 : 0,
                }
            }, {
                new: true,
                useFindAndModify: false
            })
        ));

        const NewPosts = await Post.find();

        NewPosts?.map(async (post) => (
            await Post.findByIdAndUpdate(post._id, {
                $set: {
                    status: post.diamonds > 0 ? "Active" : "InActive"
                }
            }, {
                new: true,
                useFindAndModify: false
            })
        ));



        response.status(200).json({
            status: 200,
            message: "Diamonds Remove Successfully..."
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})



router.delete("/delete/:id", auth, user, async (request, response) => {
    try {

        await Post.findByIdAndUpdate(request.params.id, {
            $set: {
                status: "InActive"
            }
        }, {
            new: true,
            useFindAndModify: false
        })

        response.status(200).json({
            status: 200,
            message: "Post Delete Successfuly..."
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})



// Report

router.post("/report/:post_id", auth, user, async (request, response) => {
    try {

        await PostReport.create({
            user: request.user.id,
            post: request.params.post_id,
            reason: request.body.reason
        });
        response.status(201).json({
            status: 201,
            message: "Report Successfully...",
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


// Comments

router.put("/comment/store/:post_id", auth, user, async (request, response) => {
    try {

        await SendPostPushNotification(request.params.post_id, `${request.user?.first_name} ${request.user?.last_name}`, `Comment on your post...`);

        const { comment } = request.body;

        const post = await Post.findById(request.params.post_id);

        post.comments.push({
            user: request.user.id,
            comment,
            createAt: new Date(Date.now()),
        });


        await post.save();

        // Notification
        await Notification.create({
            user_id: post?.user.toString(),
            user: request.user.id,
            description: "comment on your photo",
            type: "Comment"
        });

        // Reaction
        await Reaction.create({
            user: post?.user.toString(),
            reaction_user: request.user.id,
            description: "comment on your photo",
        });


        // Diamonds
        if (request.user?._id.toString() !== post?.user?._id.toString()) {
            await Post.findByIdAndUpdate(request.params.post_id, {
                $set: {
                    post_diamonds: post.post_diamonds > 0 ? post.post_diamonds + .17 : 0,
                    tranding_diamonds: post.tranding_diamonds > 0 ? post.tranding_diamonds + .17 : 0,
                }
            })
        }


        const newPost = await Post.findById(request.params.post_id).populate("comments.user", "first_name last_name image");

        response.status(201).json({
            status: 201,
            updatedComments: newPost.comments,
            message: "Comment Create Successfully...",
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})



router.put("/comment/like/:post_id/:comment_id", auth, user, async (request, response) => {
    try {
        const { post_id, comment_id } = request.params;
        await Post.updateOne(
            { _id: post_id, "comments._id": comment_id },
            { $push: { "comments.$.likes": request.user._id } });

        const newPost = await Post.findById(post_id).populate("comments.user", "first_name last_name image");

        // Reaction
        const post = await Post.findById(post_id);
        await Reaction.create({
            user: post?.user.toString(),
            reaction_user: request.user.id,
            description: "liked post comment",
        });

        // Diamonds
        await Post.findByIdAndUpdate(request.params.post_id, {
            $set: {
                post_diamonds: post.post_diamonds > 0 ? post.post_diamonds + .17 : 0,
                tranding_diamonds: post.tranding_diamonds > 0 ? post.tranding_diamonds + .17 : 0,
            }
        })

        response.status(200).json({
            status: 200,
            updatedComments: newPost.comments,
            message: "Comment Like Successfully...",
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})



router.put("/comment/unlike/:post_id/:comment_id", auth, user, async (request, response) => {
    try {
        const { post_id, comment_id } = request.params;
        await Post.updateOne(
            { _id: post_id, "comments._id": comment_id },
            { $pull: { "comments.$.likes": request.user._id } });
        const newPost = await Post.findById(post_id).populate("comments.user", "first_name last_name image");

        // Diamonds
        const post = await Post.findById(post_id);
        await Post.findByIdAndUpdate(request.params.post_id, {
            $set: {
                post_diamonds: post.post_diamonds > 0 ? post.post_diamonds - .17 : 0,
                tranding_diamonds: post.tranding_diamonds > 0 ? post.tranding_diamonds - .17 : 0,
            }
        })

        response.status(200).json({
            status: 200,
            updatedComments: newPost.comments,
            message: "Comment UnLike Successfully...",
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.delete("/comment/delete/:post_id/:comment_id", auth, async (request, response) => {
    try {


        const { post_id, comment_id } = request.params;
        const post = await Post.findById({ _id: post_id });

        post.comments = post.comments.filter((comment) => comment._id.toString() !== comment_id.toString());


        await post.save();
        const newPost = await Post.findById(request.params.post_id).populate("comments.user", "first_name last_name image");

        // Diamonds
        if (request.user?._id.toString() !== post?.user?._id.toString()) {
            await Post.findByIdAndUpdate(request.params.post_id, {
                $set: {
                    post_diamonds: post.post_diamonds > 0 ? post.post_diamonds - .17 : 0,
                    tranding_diamonds: post.tranding_diamonds > 0 ? post.tranding_diamonds - .17 : 0,
                }
            })
        }

        response.status(200).json({
            status: 200,
            updatedComments: newPost.comments,
            message: "Comment Delete Successfully...",
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})



// post View
router.put("/view/:post_id", auth, user, async (request, response) => {
    try {

        const { post_id } = request.params;
        const post = await Post.findById(post_id);
        const user = post.views.filter(function (item) {
            return item.user.toString() === request.user.id.toString();
        });

        if (user.length === 0) {
            const post = await Post.findById(request.params.post_id);
            post.views.push({
                user: request.user.id,
            });

            await post.save();

            // Reaction
            await Reaction.create({
                user: post?.user.toString(),
                reaction_user: request.user.id,
                description: "View",
            });
            // Diamonds
            await Post.findByIdAndUpdate(request.params.post_id, {
                $set: {
                    post_diamonds: post.post_diamonds > 0 ? post.post_diamonds + .17 : 0,
                    tranding_diamonds: post.tranding_diamonds > 0 ? post.tranding_diamonds + .17 : 0,
                }
            })

            response.status(200).json({
                status: 200,
                message: "View Successfully...",
            });
        } else {
            response.status(200).json({
                status: 200,
                message: "Already Viewed...",
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





// Likes

router.put("/like/:post_id", auth, user, async (request, response) => {
    try {




        await SendPostPushNotification(request.params.post_id, `${request.user?.first_name} ${request.user?.last_name}`, "Liked your post...")



        const post = await Post.findByIdAndUpdate(request.params.post_id, {
            $push: { likes: request.user._id },
        });
        const likeCounts = await Post.findById(request.params.post_id);
        likeCounts.numbersOfLikes = likeCounts.likes.length;
        await likeCounts.save();


        // Notification
        await Notification.create({
            user_id: post?.user.toString(),
            user: request.user.id,
            description: "like your photo",
            type: "Like"
        });

        // Reactions
        await Reaction.create({
            user: post?.user.toString(),
            reaction_user: request.user.id,
            description: "like your photo",
        });

        // Diamonds
        await Post.findByIdAndUpdate(request.params.post_id, {
            $set: {
                post_diamonds: post.post_diamonds > 0 ? post.post_diamonds + .17 : 0,
                tranding_diamonds: post.tranding_diamonds > 0 ? post.tranding_diamonds + .17 : 0,
            }
        })


        response.status(200).json({
            status: 20111,
            message: "Like Successfully...",
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.put("/unlike/:post_id", auth, user, async (request, response) => {
    try {

        await SendPostPushNotification(request.params.post_id, `${request.user?.first_name} ${request.user?.last_name}`, `UnLiked your post...`);
        const post = await Post.findByIdAndUpdate(request.params.post_id, {
            $pull: { likes: request.user._id }
        });

        const likeCounts = await Post.findById(request.params.post_id);
        likeCounts.numbersOfLikes = likeCounts.likes.length;
        await likeCounts.save();


        // Diamonds
        await Post.findByIdAndUpdate(request.params.post_id, {
            $set: {
                post_diamonds: post.post_diamonds > 0 ? post.post_diamonds - .17 : 0,
                tranding_diamonds: post.tranding_diamonds > 0 ? post.tranding_diamonds - .17 : 0,
            }
        })

        response.status(200).json({
            status: 200,
            message: "UnLike Successfully...",
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})




// Update Diamond
router.put("/diamond/:post_id", auth, user, async (request, response) => {
    try {

        await SendPostPushNotification(request.params.post_id, `${request.user?.first_name} ${request.user?.last_name}`, `Send you ${request.body.post_diamonds} diamonds...`);

        // Tranactions
        const sender_id = request.user.id;
        const reciver_id = request.body.user;

        const senderDiamonds = await Diamond.findOne({ user: sender_id });

        if (request.body.post_diamonds <= senderDiamonds.diamonds) {
            const post = await Post.findByIdAndUpdate(request.params.post_id);
            // console.log(post)
            await Post.findByIdAndUpdate(request.params.post_id, {
                $set: {
                    post_diamonds: post.post_diamonds + request.body.post_diamonds,
                    tranding_diamonds: post.tranding_diamonds + request.body.post_diamonds,
                    user_diamonds: post.user_diamonds + request.body.post_diamonds,
                    status: "Active"
                }
            },
                {
                    new: true,
                    useFindAndModify: false
                });


            // Sender 
            await Diamond.findByIdAndUpdate(senderDiamonds._id, {
                $set: {
                    diamonds: senderDiamonds.diamonds - request.body.post_diamonds,
                }
            }, { new: true, useFindAndModify: false });


            senderDiamonds.transactions.push({
                user: reciver_id,
                diamonds: request.body.post_diamonds,
                type: "Sender",
                tranAt: new Date(Date.now()),
            });

            await senderDiamonds.save();


            // Reciver


            const reciverDiamonds = await Diamond.findOne({ user: reciver_id });

            if (reciverDiamonds.length > 0) {

                await Diamond.findByIdAndUpdate(reciverDiamonds._id, {
                    $set: {
                        diamonds: reciverDiamonds.diamonds + request.body.post_diamonds,
                    }
                }, { new: true, useFindAndModify: false });

                reciverDiamonds.transactions.push({
                    user: sender_id,
                    diamonds: request.body.post_diamonds,
                    type: "Reciver",
                    tranAt: new Date(Date.now()),
                });

                await reciverDiamonds.save();

            } else {
                await Diamond.create({
                    user: reciver_id,
                    diamonds: request.body.post_diamonds,
                    transactions: {
                        user: sender_id,
                        diamonds: request.body.post_diamonds,
                        type: "Reciver",
                        tranAt: new Date(Date.now()),
                    }
                });
            }


            const updatedDaimonds = await Post.findByIdAndUpdate(request.params.post_id);

            response.status(200).json({
                status: 200,
                updatedDaimonds: updatedDaimonds.user_diamonds,
                message: "Diamond Added Successfully...",
            });



        } else {
            response.status(200).json({
                status: 2010,
                message: `You Have only ${senderDiamonds.diamonds} Diamonds,  you can't add ${request.body.post_diamonds}...`
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


// Share 

router.put("/share/:post_id", auth, user, async (request, response) => {
    try {


        await SendPostPushNotification(request.params.post_id, `${request.user?.first_name} ${request.user?.last_name}`, `Stared your post...`);
        const post = await Post.findById(request.params.post_id);
        post.shares.push({
            user: request.user.id,
        });

        await post.save();

        // Notification
        await Notification.create({
            user_id: post?.user.toString(),
            user: request.user.id,
            description: "share your photo",
            type: "Share"
        });

        // Reactions
        await Reaction.create({
            user: post?.user.toString(),
            reaction_user: request.user.id,
            description: "share your photo",
        });

        // Diamonds
        await Post.findByIdAndUpdate(request.params.post_id, {
            $set: {
                post_diamonds: post.post_diamonds > 0 ? post.post_diamonds + .17 : 0,
                tranding_diamonds: post.tranding_diamonds > 0 ? post.tranding_diamonds + .17 : 0,
            }
        })


        response.status(200).json({
            status: 200,
            message: "Post Share Successfully...",
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
