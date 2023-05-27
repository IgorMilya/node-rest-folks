import mongoose from "mongoose";
import { schemaOptions } from "../utils/schemaOptions.js";

export const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    secondName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
      default:
        "https://res.cloudinary.com/dz5jl6tzt/image/upload/v1685188868/userAvatar_fbe972.webp",
    },
    role: {
      type: String,
      default: "WAITER",
    },
  },
  schemaOptions
);
