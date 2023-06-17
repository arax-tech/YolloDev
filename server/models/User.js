const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

// Table Schema/Migration
const userSchema = new mongoose.Schema({
    first_name: { type: String, trim: true },
    last_name: { type: String, trim: true },
    username: { type: String, trim: true },
    email: { type: String, trim: true },
    recovery_email: { type: String, trim: true },
    password: { type: String },
    phone: { type: String },
    otp: { type: String },
    gender: { type: String },
    birthday: { type: String },
    country: { type: String },
    city: { type: String },
    bio: { type: String },
    profile_visibility: { type: String },
    reaction_visibility: { type: String },
    new_user: { type: Boolean, default: true, },
    status: { type: String },
    image: { type: String },
    // image: {
    //     public_id: { type: String },
    //     url: { type: String }
    // },
    role: { type: String, default: "User", },
    notification_settings: [
        {
            id: { type: Number },
            checked: { type: Boolean },
            name: { type: String },
        }
    ],
    badges: [{ badge: { type: mongoose.Schema.ObjectId, ref: "Badge", required: true } }],
    followers: [{ user: { type: mongoose.Schema.ObjectId, ref: "User", required: true } }],
    following: [{ user: { type: mongoose.Schema.ObjectId, ref: "User", required: true } }],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    fcm_token: { type: String },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    createAt: {
        type: Date,
        default: Date.now
    }

})



// Password Hasing
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

// Generating Auth Token

userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
        this.tokens = this.tokens.concat({ token: token })
        await this.save();
        return token;
    }
    catch (error) {
        console.log(error);
    }
}

// Generate Reset Password Token 
userSchema.methods.getResetPasswordToken = function () {

    // Generating Token 
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing & Adding to ResetPasswordToken in userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Expire Token after 10 Minutes
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; //Minutes 10 / Second 60 / Milisecond 1000

    return resetToken;

}

// Model
const User = new mongoose.model("User", userSchema);
module.exports = User;