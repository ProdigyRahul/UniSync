import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import ftp from 'basic-ftp';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/User.js';
import dotenv from 'dotenv';

const app = express();

// Load environment variables from .env file
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

// MongoDB connection
connectDB();

// FTP server configuration
const ftpConfig = {
  host: process.env.FTP_HOST,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  // Add other FTP configuration if needed
};

// FTP connection
const ftpClient = new ftp.Client();
const connectFTP = async (config) => {
  try {
    await ftpClient.access(config);
    console.log('Connected to FTP server');
  } catch (error) {
    console.error('FTP connection error:', error);
  }
};

connectFTP(ftpConfig);

// Passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
