import ftp from 'basic-ftp';

const ftpClient = new ftp.Client();

export const connectFTP = async (config) => {
    try {
        await ftpClient.access(config);
        console.log('Connected to FTP server');
    } catch (error) {
        console.error('FTP connection error:', error);
    }
};

export default ftpClient;
