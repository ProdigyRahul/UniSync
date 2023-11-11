import express from 'express';
import passport from 'passport';
import { register, login, protectedRoute } from '../controllers/authController.js';

const router = express.Router();

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);

// Protected route (example)
router.get('/protected', passport.authenticate('jwt', { session: false }), protectedRoute);

export default router;
