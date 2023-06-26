import mongoose from 'mongoose';
import {schemaOptionsWithTimestamp} from '../utils/schemaOptions.js';

export const Delivery = new mongoose.Schema(
  {
    status: {type: String, default: 'opened'},
    order: {type: mongoose.Types.ObjectId, ref: 'OrderDB'},
    time: {type: Number, required: true},
    clientInfo: {
      name: {type: String, required: true},
      phoneNumber: {type: String, required: true},
      paymentMethod: {type: String, required: true},
      email: String,
      description: String,
    },
    courier: {type: mongoose.Types.ObjectId, ref: 'user'},
    statusPriority: {
      type: Number,
      enum: [1, 2, 3, 4],
    },

    address: {
      street: {type: String, required: true},
      latitude: Number,
      longitude: Number,
    },
  },
  schemaOptionsWithTimestamp
);

Delivery.pre('save', function (next) {
  if (this.status === 'opened') {
    this.statusPriority = 1;
  } else if (this.status === 'delivering') {
    this.statusPriority = 2;
  } else if (this.status === 'done') {
    this.statusPriority = 3;
  } else if (this.status === 'rejected') {
    this.statusPriority = 4;
  }
  next();
});

export default mongoose.model('DeliveryDB', Delivery, 'delivery');
