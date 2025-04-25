const User = require('../Model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } =  require('../constant');

//signup
exports.signup = async (req, res) => {
    const {name,  email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please enter all fields'
      });
    }
        
    try {
        let user = await User.findOne({ where: { email: email } });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "doctor"
        });

        const payload = {
            user: {
                id: user.user_id,
                name: user.name,
                role: user.role
            }
        };
        
        jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error generating token' });
            }
            res.json({
                success: true,
                message: 'User registered successfully',
                token
            });
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
};


// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: 'Please provide email and password'
        });
    }

    try {
        let user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User does not exist'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const payload = {
            user: {
                id: user.user_id,
                role: user.role
            }
        };

        jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error generating token' });
            }
            res.json({
                success: true,
                message: 'User logged in successfully',
                token
            });
        });

    } catch (err) {
        res.status(500).json({ success: false,   message: 'Server error. Please try again later.' });
    }
};