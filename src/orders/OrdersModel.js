import mongoose from 'mongoose'
import { schemaOptionsWithTimestamp } from '../utils/schemaOptions.js'

const dishes = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
  },
  schemaOptionsWithTimestamp,
)

const additionalFood = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
  },
  schemaOptionsWithTimestamp,
)

const deliveryDetails = new mongoose.Schema(
  {
    phone: { type: String, required: true },
    name: { type: String, required: true },
    addresses: { type: String, required: true },
    email: String,
  },
  schemaOptionsWithTimestamp,
)

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
  schemaOptionsWithTimestamp,
)

export default mongoose.model('OrderDB', Order, 'orders')
