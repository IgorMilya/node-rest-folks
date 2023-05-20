import mongoose from 'mongoose';
import { schemaOptionsWithTimestamp, schemaOptions } from '../utils/schemaOptions.js';

const dishes = new mongoose.Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        amount: { type: Number, required: true },
    },
    schemaOptions
);

const additionalFood = new mongoose.Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        amount: { type: Number, required: true },
    },
    schemaOptions
);

const deliveryDetails = new mongoose.Schema(
    {
        phone: { type: String, required: true },
        name: { type: String, required: true },
        addresses: { type: String, required: true },
        email: String,
    },
    schemaOptions
);

const tip = new mongoose.Schema(
    {
        amount: { type: Number, required: true },
        type: { type: String, required: true },
    },
    schemaOptions
);
export const Order = new mongoose.Schema(
    {
        status: { type: String, required: true },
        diningOptions: { type: String, required: true },
        orderNumber: { type: String, required: true },
        totalPrice: { type: Number, required: true },
        paymentMethod: { type: String, required: true },
        tip: tip,
        tableTitle: String,
        dishes: [dishes],
        additionalFood: [additionalFood],
        deliveryDetails: deliveryDetails,
        email: String,
        description: String,
    },
    schemaOptionsWithTimestamp
);

export default mongoose.model('OrderDB', Order, 'orders');
