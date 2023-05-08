import mongoose from 'mongoose'

const reservationsInfoSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  clientName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  visitTag: String,
  notes: String,
})

export const tableSchema = new mongoose.Schema({
  number: { type: String, required: true },
  reserved: { type: Boolean, required: true, default: false },
  reservationInfo: [reservationsInfoSchema],
})

export const TableModel = mongoose.model('table', tableSchema)
