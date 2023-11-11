import express from 'express';
import passport from 'passport';
import {
    uploadFile,
    getFiles,
    approveFile,
    denyFile,
} from '../controllers/fileController.js';

const router = express.Router();

// File upload route
router.post(
    '/upload',
    passport.authenticate('jwt', { session: false }),
    uploadFile
);

// Get files route
router.get(
    '/get',
    passport.authenticate('jwt', { session: false }),
    getFiles
);

// Approve file route
router.put(
    '/approve/:fileId',
    passport.authenticate('jwt', { session: false }),
    approveFile
);

// Deny file route
router.put(
    '/deny/:fileId',
    passport.authenticate('jwt', { session: false }),
    denyFile
);

export default router;
