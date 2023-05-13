import mongoose from 'mongoose'
import { schemaOptions } from '../utils/schemaOptions.js'

const reservationsInfoSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    time: { type: String, required: true },
    clientName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    visitTag: String,
    notes: String,
  },
  schemaOptions,
)

export const tableSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, unique: true },
    reserved: { type: Boolean, required: true, default: false },
    reservationInfo: { type: [reservationsInfoSchema], required: true, default: [] },
  },
  schemaOptions,
)

export const TableModel = mongoose.model('table', tableSchema)
