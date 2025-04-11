const express = require('express');
const router = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { User } = require('../db');
const JWT_SECRET = require('../config');

const userSchema = zod.object({
    username: zod.string().min(3).max(30),
    password: zod.string().min(8),
    firstname: zod.string().max(50),
    lastname: zod.string().max(50),
})

// signup and signin routes
router.post("/signup", async (req, res) => {
    const bodyData = req.body;
    const { success } = userSchema.safeParse(bodyData);
    if(!success) {
        req.json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    // check if user exists
    const existingUser = await User.findOne({
        username: bodyData.username
    })
    if(existingUser._id) {
        req.json({
            message: "User already exists"
        })
    }

    // create user
    const user = await User.create(bodyData);
    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET)

    req.json({
        message: "User created successfully",
        token: token,
    })
})

module.exports = router;