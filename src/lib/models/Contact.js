import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    message: { type: String, required: true },
    studyLevel: { type: String },
    type: { type: String, enum: ['contact', 'consultation'], required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);