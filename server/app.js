require("dotenv").config();

const cloudinary = require("cloudinary")

const express = require("express")
const cors = require("cors")
const cookie = require("cookie-parser")
const bodyParser = require("body-parser")
const morgan = require("morgan")

const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 8000;


// Middlewares
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json({ limit: '100mb' }));
app.use(cors());
app.use(cookie());
app.use(morgan("dev"));

app.use(express.static("public"));




// Database 
require("./database/config")


// Images Uploading Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// Model

const Post = require("./models/Post");
const Notification = require("./models/Notification");

cron.schedule('0 */1 * * * *', async () => {
    const posts = await Post.find();

    // Update Diamonds
    posts?.map(async (post) => (
        await Post.findByIdAndUpdate(post._id, {
            $set: {
                post_diamonds: post.post_diamonds > 0 ? post.post_diamonds - 1 : 0,
            }
        })
    ));

    // Update Post Status According to Diamonds
    const PostsStatus = await Post.find();
    PostsStatus?.map(async (post) => (
        await Post.findByIdAndUpdate(post._id, {
            $set: {
                status: post.post_diamonds > 0 ? "Active" : "InActive"
            }
        })
    ));


    // Update Post Status According to Diamonds
    const PostsNotifications = await Post.find();
    PostsNotifications?.map(async (post) => (
        post?.post_diamonds === 60 && (
            await Notification.create({
                user_id: post?.user.toString(),
                user: post?.user.toString(),
                description: `Your Post time ending soon-|-${post?.post_diamonds}`,
                type: "PostTimeEnding"
            })
        )


    ));


    // var currentdate = new Date();
    // var datetime = "Date & Time: " + currentdate.getDate() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getFullYear() + " | "
    //     + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

    // console.log(`Diamonds Update at ${datetime}`);
});




// Auth Routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/admin", require("./routes/admin"))

// User
app.use("/api/user", require("./routes/User/user"));
app.use("/api/user/help/support", require("./routes/User/support"));
app.use("/api/user/tag", require("./routes/User/tag"));


// Posts
app.use("/api/user/post", require("./routes/User/post"));
app.use("/api/user/memories", require("./routes/User/memories"));
app.use("/api/user/search", require("./routes/User/search"));

app.use("/api/user/getstream", require("./routes/User/getstream"));

app.use("/api/user/post", require("./routes/User/post"));
app.use("/api/user/diamond", require("./routes/User/diamond"));
app.use("/api/user/notification", require("./routes/User/notification"));

// Admin
app.use("/api/admin/post", require("./routes/Admin/post"));
app.use("/api/admin/user", require("./routes/Admin/user"));
app.use("/api/admin/badge", require("./routes/Admin/badge"));
app.use("/api/admin/page", require("./routes/Admin/page"));
app.use("/api/admin/support", require("./routes/Admin/support"));


// Server Listing At 
app.listen(PORT, () => {
    // console.log(`Server is Running at http://localhost:8000/`);
});





