const express = require("express")

const router = express.Router()


// Middlewares
const auth = require("../../middleware/auth")
const user = require("../../middleware/user")


// Model 
const Post = require("../../models/Post")

router.get("/repost/:id", auth, user, async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if (post?.status === "Active") {
            response.status(200).json({
                status: 422,
                message: "Post Already Active..."
            });

        } else {
            post.status = "Active";
            post.post_diamonds = 1440;
            await post.save();

            response.status(200).json({
                status: 2001,
                message: "Re Post Successfully..."
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


router.get("/:month/:year", auth, user, async (request, response) => {
    try {
        const _id = request.user.id;

        const year = request.params.year;
        let month = request.params.month;
        month.length === 1 ? month = 0 + month : month

        const monthDay1 = `${year}-${month}-01T00:00:00.000Z`;
        const monthDay2 = `${year}-${month}-02T00:00:00.000Z`;
        const monthDay3 = `${year}-${month}-03T00:00:00.000Z`;
        const monthDay4 = `${year}-${month}-04T00:00:00.000Z`;
        const monthDay5 = `${year}-${month}-05T00:00:00.000Z`;
        const monthDay6 = `${year}-${month}-06T00:00:00.000Z`;
        const monthDay7 = `${year}-${month}-07T00:00:00.000Z`;

        const monthDay8 = `${year}-${month}-08T00:00:00.000Z`;
        const monthDay9 = `${year}-${month}-09T00:00:00.000Z`;
        const monthDay10 = `${year}-${month}-10T00:00:00.000Z`;
        const monthDay11 = `${year}-${month}-11T00:00:00.000Z`;
        const monthDay12 = `${year}-${month}-12T00:00:00.000Z`;
        const monthDay13 = `${year}-${month}-13T00:00:00.000Z`;
        const monthDay14 = `${year}-${month}-14T00:00:00.000Z`;

        const monthDay15 = `${year}-${month}-15T00:00:00.000Z`;
        const monthDay16 = `${year}-${month}-16T00:00:00.000Z`;
        const monthDay17 = `${year}-${month}-17T00:00:00.000Z`;
        const monthDay18 = `${year}-${month}-18T00:00:00.000Z`;
        const monthDay19 = `${year}-${month}-19T00:00:00.000Z`;
        const monthDay20 = `${year}-${month}-20T00:00:00.000Z`;
        const monthDay21 = `${year}-${month}-21T00:00:00.000Z`;

        const monthDay22 = `${year}-${month}-22T00:00:00.000Z`;
        const monthDay23 = `${year}-${month}-23T00:00:00.000Z`;
        const monthDay24 = `${year}-${month}-24T00:00:00.000Z`;
        const monthDay25 = `${year}-${month}-25T00:00:00.000Z`;
        const monthDay26 = `${year}-${month}-26T00:00:00.000Z`;
        const monthDay27 = `${year}-${month}-27T00:00:00.000Z`;
        const monthDay28 = `${year}-${month}-28T00:00:00.000Z`;

        const monthDay29 = `${year}-${month}-29T00:00:00.000Z`;
        const monthDay30 = `${year}-${month}-30T00:00:00.000Z`;
        const monthDay31 = `${year}-${month}-31T00:00:00.000Z`;
        const monthDay32 = `${year}-${month}-31T09:59:59.999Z`;




        const monthDay1Posts = await Post.find({ user: _id, createAt: { $gte: monthDay1, $lt: monthDay2 } });
        const monthDay2Posts = await Post.find({ user: _id, createAt: { $gte: monthDay2, $lt: monthDay3 } });
        const monthDay3Posts = await Post.find({ user: _id, createAt: { $gte: monthDay3, $lt: monthDay4 } });
        const monthDay4Posts = await Post.find({ user: _id, createAt: { $gte: monthDay4, $lt: monthDay5 } });
        const monthDay5Posts = await Post.find({ user: _id, createAt: { $gte: monthDay5, $lt: monthDay6 } });
        const monthDay6Posts = await Post.find({ user: _id, createAt: { $gte: monthDay6, $lt: monthDay7 } });
        const monthDay7Posts = await Post.find({ user: _id, createAt: { $gte: monthDay7, $lt: monthDay8 } });

        const monthDay8Posts = await Post.find({ user: _id, createAt: { $gte: monthDay8, $lt: monthDay9 } });
        const monthDay9Posts = await Post.find({ user: _id, createAt: { $gte: monthDay9, $lt: monthDay10 } });
        const monthDay10Posts = await Post.find({ user: _id, createAt: { $gte: monthDay10, $lt: monthDay11 } });
        const monthDay11Posts = await Post.find({ user: _id, createAt: { $gte: monthDay11, $lt: monthDay12 } });
        const monthDay12Posts = await Post.find({ user: _id, createAt: { $gte: monthDay12, $lt: monthDay13 } });
        const monthDay13Posts = await Post.find({ user: _id, createAt: { $gte: monthDay13, $lt: monthDay14 } });
        const monthDay14Posts = await Post.find({ user: _id, createAt: { $gte: monthDay14, $lt: monthDay15 } });

        const monthDay15Posts = await Post.find({ user: _id, createAt: { $gte: monthDay15, $lt: monthDay16 } });
        const monthDay16Posts = await Post.find({ user: _id, createAt: { $gte: monthDay16, $lt: monthDay17 } });
        const monthDay17Posts = await Post.find({ user: _id, createAt: { $gte: monthDay17, $lt: monthDay18 } });
        const monthDay18Posts = await Post.find({ user: _id, createAt: { $gte: monthDay18, $lt: monthDay19 } });
        const monthDay19Posts = await Post.find({ user: _id, createAt: { $gte: monthDay19, $lt: monthDay20 } });
        const monthDay20Posts = await Post.find({ user: _id, createAt: { $gte: monthDay20, $lt: monthDay21 } });
        const monthDay21Posts = await Post.find({ user: _id, createAt: { $gte: monthDay21, $lt: monthDay22 } });

        const monthDay22Posts = await Post.find({ user: _id, createAt: { $gte: monthDay22, $lt: monthDay23 } });
        const monthDay23Posts = await Post.find({ user: _id, createAt: { $gte: monthDay23, $lt: monthDay24 } });
        const monthDay24Posts = await Post.find({ user: _id, createAt: { $gte: monthDay24, $lt: monthDay25 } });
        const monthDay25Posts = await Post.find({ user: _id, createAt: { $gte: monthDay25, $lt: monthDay26 } });
        const monthDay26Posts = await Post.find({ user: _id, createAt: { $gte: monthDay26, $lt: monthDay27 } });
        const monthDay27Posts = await Post.find({ user: _id, createAt: { $gte: monthDay27, $lt: monthDay28 } });
        const monthDay28Posts = await Post.find({ user: _id, createAt: { $gte: monthDay28, $lt: monthDay29 } });

        const monthDay29Posts = await Post.find({ user: _id, createAt: { $gte: monthDay29, $lt: monthDay30 } });
        const monthDay30Posts = await Post.find({ user: _id, createAt: { $gte: monthDay30, $lt: monthDay31 } });
        const monthDay31Posts = await Post.find({ user: _id, createAt: { $gte: monthDay31, $lt: monthDay32 } });



        const firstWeekFirstDay = `${year}-${month}-01T00:00:00.000Z`;
        const firstWeekLastDay = `${year}-${month}-07T00:00:00.000Z`;
        const firstWeekPosts = await Post.find({ user: _id, createAt: { $gte: firstWeekFirstDay, $lte: firstWeekLastDay } });





        const secondWeekFirstDay = `${year}-${month}-07T00:00:00.000Z`;
        const secondWeekLastDay = `${year}-${month}-14T00:00:00.000Z`;
        const secondWeekPosts = await Post.find({ user: _id, createAt: { $gte: secondWeekFirstDay, $lte: secondWeekLastDay } });


        const thirdWeekFirstDay = `${year}-${month}-14T00:00:00.000Z`;
        const thirdWeekLastDay = `${year}-${month}-21T00:00:00.000Z`;
        const thirdWeekPosts = await Post.find({ user: _id, createAt: { $gte: thirdWeekFirstDay, $lte: thirdWeekLastDay } });


        const fourWeekFirstDay = `${year}-${month}-21T00:00:00.000Z`;
        const fourWeekLastDay = `${year}-${month}-28T00:00:00.000Z`;
        const fourWeekPosts = await Post.find({ user: _id, createAt: { $gte: fourWeekFirstDay, $lte: fourWeekLastDay } });

        const fiveWeekFirstDay = `${year}-${month}-28T00:00:00.000Z`;
        const fiveWeekLastDay = `${year}-${month}-31T00:00:00.000Z`;
        const fiveWeekPosts = await Post.find({ user: _id, createAt: { $gte: fiveWeekFirstDay, $lte: fiveWeekLastDay } });





        response.status(200).json({
            status: 200,
            firstWeekPosts: firstWeekPosts,
            secondWeekPosts: secondWeekPosts,
            thirdWeekPosts: thirdWeekPosts,
            fourWeekPosts: fourWeekPosts,
            fiveWeekPosts: fiveWeekPosts,

            monthDay1Posts: monthDay1Posts,
            monthDay2Posts: monthDay2Posts,
            monthDay3Posts: monthDay3Posts,
            monthDay4Posts: monthDay4Posts,
            monthDay5Posts: monthDay5Posts,
            monthDay6Posts: monthDay6Posts,
            monthDay7Posts: monthDay7Posts,

            monthDay8Posts: monthDay8Posts,
            monthDay9Posts: monthDay9Posts,
            monthDay10Posts: monthDay10Posts,
            monthDay11Posts: monthDay11Posts,
            monthDay12Posts: monthDay12Posts,
            monthDay13Posts: monthDay13Posts,
            monthDay14Posts: monthDay14Posts,

            monthDay15Posts: monthDay15Posts,
            monthDay16Posts: monthDay16Posts,
            monthDay18Posts: monthDay18Posts,
            monthDay19Posts: monthDay19Posts,
            monthDay20Posts: monthDay20Posts,
            monthDay21Posts: monthDay21Posts,

            monthDay22Posts: monthDay22Posts,
            monthDay23Posts: monthDay23Posts,
            monthDay24Posts: monthDay24Posts,
            monthDay25Posts: monthDay25Posts,
            monthDay26Posts: monthDay26Posts,
            monthDay27Posts: monthDay27Posts,
            monthDay28Posts: monthDay28Posts,

            monthDay29Posts: monthDay29Posts,
            monthDay30Posts: monthDay30Posts,
            monthDay31Posts: monthDay31Posts,

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








