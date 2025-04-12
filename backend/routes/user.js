const express = require('express');
const router = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { User, Account } = require('../db');
const JWT_SECRET = require('../config');
const authMiddleware = require('../middleware');

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})

// signup and signin routes
router.post("/signup", async (req, res) => {
    const bodyData = req.body;
    const { success } = signupBody.safeParse(bodyData);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    // check if user exists
    const existingUser = await User.findOne({
        username: bodyData.username
    })
    if(existingUser) {
        return res.json({
            message: "User already exists"
        })
    }
    // create user
    const user = await User.create(bodyData);
    const userId = user._id;
    // Give random amount of money to the user
    await Account.create({
        userId: userId,
        balance: Math.floor(Math.random() * 10000) + 1
    })
    const token = jwt.sign({ userId }, JWT_SECRET)

    return res.json({
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
        return res.status(411).json({
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
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
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
    res.json({
        message: "User updated successfully"
    })
})

// Route to get users from the backend, filterable via firstName/lastName
router.get("/getUsers", async (req, res) => {
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
        user: usersPresent.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;