const jwt = require('jsonwebtoken');
const User = require('../Model/User');
const { JWT_SECRET } = require('../constant/index');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');        
        if(!token) {
            return res.status(401).send({ error: 'Please authenticate.' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        
        const user = await User.findOne({ where: { user_id: decoded.user.id} });    
        
       if (!user.user_id) return res.status(401).send('User not found');

        req.user = user;

        next();
    } catch (e) {
        res.status(400).send({ 
            success: false,
            message: "You are not authorized to access this resource",
        });
    }
};

module.exports = auth;