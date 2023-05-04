import mongoose from 'mongoose';

const Table = new mongoose.Schema({
    title: { type: String, required: true },
    reservationStatus: { type: Boolean, required: true },
    reservationDate: { type: String, required: true },
    reservationInfo: { type: String, required: true },
});

export default mongoose.model('TableDB', Table, 'tables');
