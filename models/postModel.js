const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title : String,
    content : String,
})

const postModel = mongoose.model('Post',postSchema)

module.exports = postModel;



