import mongoose from 'mongoose';
import { schemaOptionsWithTimestamp } from '../utils/schemaOptions.js';

export const Delivery = new mongoose.Schema(
    {
        customerName: { type: String, required: true },
        courier: { type: mongoose.Types.ObjectId, ref: 'user' },
        status: { type: String, default: 'opened' },
        time: Number,
        orderID: { type: mongoose.Types.ObjectId, ref: 'OrderDB' },
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

export default mongoose.model('DeliveryDB', Delivery, 'delivery');
