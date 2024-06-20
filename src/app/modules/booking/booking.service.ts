import { JwtPayload } from "jsonwebtoken";
import { TBooking } from "./booking.interface";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Facility } from "../facility/facility.model";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (
  payload: TBooking,
  currentUser: JwtPayload
) => {
  const { user } = currentUser;

  //   checking if the user exist
  const isUserExist = await User.findById(user);

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }

  //   checking if the facility exists
  const isFacilityExists = await Facility.findById(payload?.facility);

  if (!isFacilityExists) {
    throw new AppError(httpStatus.NOT_FOUND, "facility not found");
  }

  //   calculating payable amount
  const startTime = new Date(`1999-06-12T${payload.startTime}:00`);
  const endTime = new Date(`1999-06-12T${payload.endTime}:00`);

  const payableAmount =
    ((Number(endTime) - Number(startTime)) / 1000 / 60 / 60) *
    isFacilityExists?.pricePerHour;

  //   appending values to the payload
  payload.user = user;
  payload.payableAmount = payableAmount;
  payload.isBooked = "confirmed";

  const result = await Booking.create(payload);
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
};
