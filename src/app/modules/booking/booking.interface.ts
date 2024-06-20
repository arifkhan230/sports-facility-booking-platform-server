import { Types } from "mongoose";

export type TIsBooked = "confirmed" | "unconfirmed" | "canceled";

export type TBooking = {
  facility: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  payableAmount: number;
  isBooked: TIsBooked;
};
