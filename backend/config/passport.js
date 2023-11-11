import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new Strategy(options, async (payload, done) => {
        try {
            const user = await User.findById(payload.user._id);

            if (!user) {
                return done(null, false);
            }

            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    })
);

export default passport;
