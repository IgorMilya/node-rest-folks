import mongoose from 'mongoose';
import { schemaOptionsWithTimestamp, schemaOptions } from '../utils/schemaOptions.js';

const dishes = new mongoose.Schema({ dishID: { type: mongoose.Types.ObjectId, ref: 'Dish' }, amount: { type: Number, required: true } }, schemaOptions);

export const Order = new mongoose.Schema(
    {
        orderType: { type: String, required: true },
        orderNumber: { type: String, required: true, unique: true },
        table: String,
        dishes: [dishes],
        description: String,
    },
    schemaOptionsWithTimestamp
);

export default mongoose.model('OrderDB', Order, 'orders');
