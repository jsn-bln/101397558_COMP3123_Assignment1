const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxLength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 50
    },
    // Made maxlength to 60 because i wanted to 
    // hash the password using Bcrypt module
    // Bcrypt produces fixed 60 chars when hashed 
    password: {
        type: String,
        required: true,
        maxLength: 60
    }
})


const User = mongoose.model('User', userSchema);

module.exports = User;