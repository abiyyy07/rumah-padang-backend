const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    const authHeader = req.header('Authorization')

    // check token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Access denied, invalid token format" });
    }

    // get token
    const token = authHeader.split(' ')[1];

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        // If token expired or modified
        res.status(403).json({ error: "Token is not valid or expired" });
    }
}

module.exports = verifyToken