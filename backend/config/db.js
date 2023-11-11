import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const { MONGODB_URI } = process.env;
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export default mongoose;
