import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { hashPassword, comparePasswords } from '../helpers/hashPassword.js';

export const register = async (req, res) => {
    try {
        const { enrollmentNumber, email, password, accountType } = req.body;

        // Check if the enrollment number is unique
        const existingUser = await User.findOne({ enrollmentNumber });
        if (existingUser) {
            return res.status(400).json({ error: 'Enrollment number already exists' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new user
        const newUser = new User({
            enrollmentNumber,
            email,
            accountType,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        res.json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const login = async (req, res, next) => {
    passport.authenticate('local', { session: false }, async (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({
                message: 'Authentication failed',
                user: user,
                error: err,
            });
        }

        try {
            // Compare entered password with hashed password
            const isMatch = await comparePasswords(req.body.password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Authentication failed' });
            }

            // Generate a signed JWT token
            const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.json({ user, token });
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    })(req, res, next);
};

export const protectedRoute = (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
};
