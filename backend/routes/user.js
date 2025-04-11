const express = require('express');
const router = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { User } = require('../db');
const JWT_SECRET = require('../config');
const authMiddleware = require('../middleware');

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

const updateBody = zod.object( {
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
    password: zod.string().optional(),
})

// Update Information
router.put("/update", authMiddleware, async (req, res) => {
    // check input validation using zod library
    const bodyData = req.body;
    const { success } = updateBody.safeParse(bodyData);
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    // check if user exists
    await User.updateOne({_id: req.userId}, bodyData);
    req.json({
        message: "User updated successfully"
    })
})

module.exports = router;