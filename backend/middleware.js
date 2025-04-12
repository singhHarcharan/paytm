const { JWT_SECRET } = require('./config');
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: "Authorization token missing or invalid"
        });
    }
    const token = authHeader.split(' ')[1];
    console.log("token we get here is ", token);
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({
            message: "Invalid token"
        });
    }
};

module.exports = authMiddleware;