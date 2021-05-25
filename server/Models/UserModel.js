const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true

    },
    name: {
        type: String,
        require: true

    },
    magazines: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Magazine'
    }]
})
module.exports = mongoose.model('User', userSchema)