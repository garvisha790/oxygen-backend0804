const jwt = require('jsonwebtoken');
<<<<<<< HEAD
const User = require('../models/userModel');
 
module.exports = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        // Check if token exists
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization denied, no token provided' });
        }
        // Extract token from Bearer format
        const token = authHeader.split(' ')[1];
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Add user from payload to request
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Auth middleware error:', err.message);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        res.status(401).json({ message: 'Invalid token' });
    }
};
=======
module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
>>>>>>> 4afd72803bc02df8bd9a2bdabbed18b96955b4bb
