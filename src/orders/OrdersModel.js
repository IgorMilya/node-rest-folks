import mongoose from 'mongoose';

const dishes = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
});

const additionalFood = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
});

const deliveryDetails = new mongoose.Schema({
    phone: { type: String, required: true },
    name: { type: String, required: true },
    addresses: { type: String, required: true },
    email: String,
});

export const Order = new mongoose.Schema({
    status: { type: Boolean, required: true },
    diningOptions: { type: String, required: true },
    orderNumber: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    tipAmount: Number,
    tableTitle: String,
    dishes: [dishes],
    additionalFood: [additionalFood],
    deliveryDetails: deliveryDetails,
    email: String,
    notes: String,
});

export default mongoose.model('OrderDB', Order, 'orders');

//запит на апдейт резерваціії (+ new) і створення ордера
//запит на апдейт резерваціії (змінити мтатус) і закрити ордера (status - тру)
