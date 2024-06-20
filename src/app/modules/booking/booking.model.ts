import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
  facility: {
    type: Schema.ObjectId,
    required: true,
    ref: "Facility",
  },
  date: {
    type: Date,
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
