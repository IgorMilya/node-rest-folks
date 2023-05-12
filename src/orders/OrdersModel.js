import mongoose from 'mongoose';

const dishes = new mongoose.Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        amount: { type: Number, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
        id: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

const additionalFood = new mongoose.Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        amount: { type: Number, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
        id: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

const deliveryDetails = new mongoose.Schema(
    {
        phone: { type: String, required: true },
        name: { type: String, required: true },
        addresses: { type: String, required: true },
        email: String,
    },
    {
        timestamps: true,
        versionKey: false,
        id: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

export const Order = new mongoose.Schema(
    {
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
    },
    {
        timestamps: true,
        versionKey: false,
        id: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

export default mongoose.model('OrderDB', Order, 'orders');
