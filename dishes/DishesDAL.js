import mongoose from 'mongoose';

const Dish = new mongoose.Schema({
    title: { type: String, required: true },
    prise: { type: Number, required: true },
    picture: { type: String, required: true },
    description: { type: String, required: true },
});

export default mongoose.model('DishDB', Dish, 'dishes');
