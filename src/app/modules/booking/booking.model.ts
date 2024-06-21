import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  facility: {
    type: Schema.ObjectId,
    required: true,
    ref: "Facility",
  },
  payableAmount: {
    type: Number,
    required: true,
  },
  isBooked: {
    type: String,
    enum: {
      values: ["confirmed", "unconfirmed", "canceled"],
    },
  },
});

export const Booking = model<TBooking>("Booking", bookingSchema);
