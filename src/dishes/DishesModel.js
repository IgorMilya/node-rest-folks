import mongoose from 'mongoose';
import { schemaOptions } from '../utils/schemaOptions.js';

const Dish = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        picture: { type: String },
        description: { type: String },
        categoryID: { type: mongoose.Types.ObjectId, ref: 'CategoryDB' },
        subcategoryID: { type: mongoose.Types.ObjectId, ref: 'CategoryDB' },
        weight: { type: Number, required: true },
        bonus: Number,
        additionalFood: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'DishDB',
            },
        ],
    },
    schemaOptions
);

export default mongoose.model('DishDB', Dish, 'dishes');
