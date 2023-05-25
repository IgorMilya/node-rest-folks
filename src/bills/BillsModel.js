import mongoose from 'mongoose';
import { schemaOptions } from '../utils/schemaOptions.js';

const dishes = new mongoose.Schema(
    { dishID: { type: mongoose.Types.ObjectId, ref: 'Dish' }, title: String, amount: { type: Number, required: true }, price: { type: Number, required: true } },
    schemaOptions
);

export const Bill = new mongoose.Schema(
    {
        orderID: { type: mongoose.Types.ObjectId, ref: 'Order' },
        orderType: { type: String, required: true },
        orderNumber: { type: String, required: true },
        table: String,
        description: String,
        status: { type: String, default: 'opened' },
        totalPrice: { type: Number, required: true },
        tip: { type: Number, default: 0 },
        email: { type: String, default: '' },
        paymentMethod: String,
        dishes: [dishes],
    },
    schemaOptions
);

export default mongoose.model('BillDB', Bill, 'bills');
