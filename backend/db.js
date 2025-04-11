const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/paytm-app");

// Create User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
})

// Create User model
const User = mongoose.model("User", userSchema);

// export the user model
module.exports = {
    User
}