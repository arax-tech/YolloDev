const mongoose = require('mongoose')

// Table Schema/Migration
const pageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    createAt: { type: Date, default: Date.now }

})


// Model
const Page = new mongoose.model("Page", pageSchema);
module.exports = Page;