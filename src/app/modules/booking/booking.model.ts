import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
  facility: {
    type: Schema.ObjectId,
    required: true,
    ref: "Facility",
  },
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

// bookingSchema.pre("save", function (req, next) {
//   const booking = this;
//   const currentUser = req.user;
// });

export const Booking = model<TBooking>("Booking", bookingSchema);
