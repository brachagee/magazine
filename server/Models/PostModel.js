const mongoose = require("mongoose")
const PostSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    magazine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Magazine'
    }
})
module.exports = mongoose.model(PostSchema, "Post")