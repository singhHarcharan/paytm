const express = require("express");
const router = express.Router();
const zod = require("zod");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

router.get("/balance", async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });
    return res.json({
        balance: account.balance
    })
})

router.post("/transfer", async (req, res) => {
    // Create a session using mongoose for atomic transactions
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    // Check if the account exists and has sufficient balance
    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    // Check if the recipient account exists
    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
})

module.exports = router;