const mongoose = require("mongoose")
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
})
module.exports = mongoose.model(categorySchema, "Category")