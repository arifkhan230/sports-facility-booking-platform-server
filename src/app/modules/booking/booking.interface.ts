import { Types } from "mongoose";

export type TIsBooked = "confirmed" | "unconfirmed" | "canceled";

export type TBooking = {
  facility: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  user?: Types.ObjectId;
  payableAmount?: number;
  isBooked?: TIsBooked;
};
