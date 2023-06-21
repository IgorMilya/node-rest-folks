import mongoose from 'mongoose';
import { schemaOptionsWithTimestamp } from '../utils/schemaOptions.js';

export const Delivery = new mongoose.Schema(
    {
        customerName: { type: String, required: true },
        courier: { type: mongoose.Types.ObjectId, ref: 'user' },
        status: { type: String, default: 'opened' },
        statusPriority: {
            type: Number,
            enum: [1, 2, 3],
        },
        time: Number,
        order: { type: mongoose.Types.ObjectId, ref: 'OrderDB' },
        paymentMethod: String,
        address: {
            city: String,
            street: String,
            house: String,
            flat: String,
        },
        phoneNumber: String,
    },
    schemaOptionsWithTimestamp
);

Delivery.pre('save', function (next) {
    if (this.status === 'opened') {
        this.statusPriority = 1;
    } else if (this.status === 'delivering') {
        this.statusPriority = 2;
    } else if (this.status === 'closed') {
        this.statusPriority = 3;
    } else if (this.status === 'rejected') {
        this.statusPriority = 4;
    }
    next();
});

export default mongoose.model('DeliveryDB', Delivery, 'delivery');
