const jwt = require('jsonwebtoken');
const User = require('./User');

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) throw new Error('Authorization header missing');

        const token = authHeader.split(' ')[1];
        if (!token) throw new Error('Token not found in Authorization header');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.id) throw new Error('Invalid token format or payload');

        const user = await User.findById(decoded.id);
        if (!user) throw new Error('User not found');

        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.status(401).json({ error: 'Authentication failed', details: error.message });
    }
};

module.exports = authenticateToken;
