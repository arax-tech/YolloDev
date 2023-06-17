const express = require("express")

const router = express.Router()

const stream = require('getstream');

const client = stream.connect(
    'tn3ry42bcrqn',
    'ar9xjesk7ca5cjtunxpa62k267m2g9kuh2zwu5hggp7gdk3tsjnz8rrd359p9xgg'
);



// Middlewares
const auth = require("../../middleware/auth")
const user = require("../../middleware/user")


// Model 
const User = require("../../models/User")
const Tag = require("../../models/Badge")


// Create a following relationship between arham's "timeline" feed and Chris' "user" feed:

router.get("/following", auth, user, async (request, response) => {
    try {
        const arham = client.feed('timeline', 'arham');
        const data = await arham.follow('timeline', 'test');

        console.log(data);
        response.status(200).json({
            status: 200,
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.get("/", auth, user, async (request, response) => {
    try {
        const arham = client.feed('timeline', 'arham');
        const data = await arham.get({ limit: 1 });
        console.log(data)
        response.status(200).json({
            status: 200,
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.get("/token", auth, user, async (request, response) => {
    try {
        const userToken = client.createUserToken(request.user.id);
        console.log(`getstrem token ${userToken}`)

        response.status(200).json({
            status: 200,
            userToken: userToken,
            appId: process.env.GETSTREAM_API_ID,
            appKey: process.env.GETSTREAM_API_KEY,
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

        const activity = {
            'actor': 'User:1',
            'verb': 'run',
            'object': 'Exercise:42',
            'user_id': request.user.id,
            'title': 'lorem',
            'image': 'lorem',
            'started_at': new Date(),

        };

        const arham = client.feed('timeline', 'arham');

        const response1 = await arham.addActivity(activity);

        console.log(response1)

        response.status(200).json({
            status: 200
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.post("/follow", auth, user, async (request, response) => {
    try {

        const user1 = client.feed('user', '1');

        await timeline_feed_1.follow('user', request.user.id);


        response.status(200).json({
            status: 200
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
