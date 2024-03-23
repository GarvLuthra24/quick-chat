const mongoose = require('mongoose')

const userSchema =  mongoose.Schema({
    userName: {
        type: String ,
        required: true,
        min: 3,
        max:25,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        unique: true,
        min: 8
    },
    haveAnAvatar: {
        type: Boolean,
        default: false,
    },
    avatarImage:{
        type: String,
        default: ""
    }

})

module.exports = mongoose.model("User" , userSchema)