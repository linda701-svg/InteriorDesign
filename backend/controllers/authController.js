const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};

exports.register = async (req, res) => {
    try {
        console.log('Register request body:', req.body);
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        const user = await User.create({ email, password });
        const token = signToken(user._id);
        res.status(201).json({
            success: true,
            token,
            data: { user }
        });
    } catch (err) {
        console.error('Register error:', err);
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: 'Email already exists. Please login instead.' });
        }
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        const token = signToken(user._id);
        res.status(200).json({
            success: true,
            token,
            data: { user }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
