import mongoose from 'mongoose';
import { schemaOptions } from '../utils/schemaOptions.js';

const Category = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        picture: { type: String, required: true },
    },
    schemaOptions
);

export default mongoose.model('CategoryDB', Category, 'categories');
