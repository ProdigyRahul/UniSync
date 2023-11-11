import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
    enrollmentNumber: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: String,
    accountType: {
        type: Number,
        enum: [0, 1, 2], // 0: student, 1: admin, 2: faculty
        default: 0,
    },
    totalFilesUploaded: {
        type: Number,
        default: 0,
    },
    acceptedFiles: {
        type: Number,
        default: 0,
    },
    pendingFiles: {
        type: Number,
        default: 0,
    },
    fileUIDs: {
        type: [String],
        default: [],
    },
});

// Add Passport-Local Mongoose plugin
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

export default User;
