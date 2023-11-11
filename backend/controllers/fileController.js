import ftpClient from '../config/ftp.js';
import User from '../models/User.js';

export const uploadFile = async (req, res) => {
    const ftpConfig = {
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
        port: parseInt(process.env.FTP_PORT),
    };

    try {
        // TODO: Check user permissions and handle the uploaded file
        const { user } = req;
        if (!user || user.accountType !== 0) { // Ensure the user is a student (adjust as needed)
            return res.status(403).json({ error: 'Permission denied' });
        }

        // Handle file upload logic
        await ftpClient.uploadFrom(req.file.path, `/uploads/${req.file.filename}`);

        // TODO: Update user's file-related information in the database
        // For example, increment the totalFilesUploaded field in the User model

        res.json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.error('File upload error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getFiles = async (req, res) => {
    try {
        // TODO: Implement logic to retrieve files (e.g., from the database or FTP server)

        // For now, returning a placeholder response
        res.json({ message: 'Get files functionality to be implemented' });
    } catch (error) {
        console.error('Get files error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const approveFile = async (req, res) => {
    const { fileId } = req.params;

    try {
        // TODO: Check user permissions and update file approval status in the database
        const { user } = req;
        if (!user || user.accountType !== 1) { // Ensure the user is an admin (adjust as needed)
            return res.status(403).json({ error: 'Permission denied' });
        }

        // TODO: Implement logic to update file approval status in the database
        // For example, update the approved field in the File model based on fileId

        res.json({ message: 'File approved successfully' });
    } catch (error) {
        console.error('File approval error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const denyFile = async (req, res) => {
    const { fileId } = req.params;

    try {
        // TODO: Check user permissions and update file approval status in the database
        const { user } = req;
        if (!user || user.accountType !== 1) { // Ensure the user is an admin (adjust as needed)
            return res.status(403).json({ error: 'Permission denied' });
        }

        // TODO: Implement logic to update file approval status in the database
        // For example, update the approved field in the File model based on fileId

        res.json({ message: 'File denied successfully' });
    } catch (error) {
        console.error('File denial error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
