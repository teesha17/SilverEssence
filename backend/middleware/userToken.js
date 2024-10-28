const jwt = require('jsonwebtoken');

const verifyUserToken = (req, res, next) => {
    const token = req.headers['userauthorize'];

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const JWT_SECRET = process.env.JWT_SECRET
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = verifyUserToken;
