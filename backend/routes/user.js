const express = require('express');
const router = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { User } = require('../db');
const JWT_SECRET = require('../config');
const authMiddleware = require('../middleware');
const { route } = require('./user');

const userSchema = zod.object({
    username: zod.string().email(),
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

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
})
// Signin route
router.post("/signin", async(req, res) => {
    // Input validation
    const bodyData = req.body;
    const { success } = signinBody.safeParse(bodyData);
    if(!success) {
        return req.status(411).json({
            message: "Incorrect inputs"
        })
    }

    // check if user exists
    const existingUser = await User.findOne({
        username: bodyData.username,
        password: bodyData.password
    })
    // IF user exists, create a token and send it back to the user
    if(existingUser) {
        const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);
        return res.json({
            token: token
        })
    }
    // otherwise, send error
    return res.status(401).json({
        message: "Invalid credentials"
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

// Route to get users from the backend, filterable via firstName/lastName
route.get("/getUsers", async (req, res) => {
    const filter = req.query.filter || "";
    const usersPresent = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
    res.json({
        user: usersPresent.map((user) => {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        })
    })
})

module.exports = router;