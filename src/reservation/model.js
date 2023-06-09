import mongoose from 'mongoose'
import { schemaOptions } from '../utils/schemaOptions.js'

export const reservationSchema = new mongoose.Schema(
  {
    table: { type: mongoose.SchemaTypes.ObjectId, ref: 'TablesDB', required: true },
    booking: { type: Number, required: true },
    persons: { type: Number, required: true },
    clientName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    status: {
      type: String,
      required: true,
      default: 'active',
      enum: ['active', 'cancelled', 'done'],
    },
    email: String,
    visitTag: String,
    notes: String,
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
  },
  schemaOptions,
)

export const ReservationModel = mongoose.model('ReservationsDB', reservationSchema, 'reservations')
