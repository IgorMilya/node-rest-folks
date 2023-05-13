import mongoose from 'mongoose'
import { schemaOptions } from '../utils/schemaOptions.js'

const additionalFood = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    weight: Number,
  },
  schemaOptions,
)

const Dish = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    picture: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: String,
    weight: { type: Number, required: true },
    bonus: Number,
    additionalFood: [additionalFood],
  },
  schemaOptions,
)

export default mongoose.model('DishDB', Dish, 'dishes')
