// UserName for MongoDB:  harcharansingh198400
// Password for MongoDB:  HlT7rxHPCH4Z2035
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://harcharansingh198400:HlT7rxHPCH4Z2035@cluster0.yguaaqu.mongodb.net/paytm-app')
    .then(() => {
        console.log("Connected to MongoDB");
    })  
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    })


// Create User schema
// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

// Create Account and User model
const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

// export the user model
module.exports = {
    User,
    Account
}