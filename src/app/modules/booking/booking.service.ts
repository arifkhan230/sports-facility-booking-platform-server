import { JwtPayload } from "jsonwebtoken";
import { TBooking } from "./booking.interface";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Facility } from "../facility/facility.model";
import { Booking } from "./booking.model";
import { getAvailableTimeSlots } from "./booking.utils";

const createBookingIntoDB = async (
  payload: TBooking,
  currentUser: JwtPayload
) => {
  const { userId } = currentUser;

  //   checking if the user exist
  const isUserExist = await User.findById(userId);

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }

  //   checking if the facility exists
  const isFacilityExists = await Facility.findById(payload?.facility);

  if (!isFacilityExists) {
    throw new AppError(httpStatus.NOT_FOUND, "facility not found");
  }

  // checking is the facility deleted
  if (isFacilityExists?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "facility has been deleted");
  }

  // checking if the facility slot available
  const scheduledTime = await Booking.find({ date: payload?.date }).select(
    "startTime endTime"
  );

  for (const schedule of scheduledTime) {
    const existingStartTime = new Date(`1999-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1999-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1999-01-01T${payload.startTime}`);
    const newEndTime = new Date(`1999-01-01T${payload.endTime}`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      throw new AppError(
        httpStatus.CONFLICT,
        "Facility not available at this time"
      );
    }
  }

  //   calculating payable amount
  const startTime = new Date(`1999-06-12T${payload.startTime}:00`);
  const endTime = new Date(`1999-06-12T${payload.endTime}:00`);

  const payableAmount =
    ((Number(endTime) - Number(startTime)) / 1000 / 60 / 60) *
    isFacilityExists?.pricePerHour;

  //   appending values to the payload
  payload.user = userId;
  payload.payableAmount = payableAmount;
  payload.isBooked = "confirmed";

  const result = await Booking.create(payload);
  return result;
};

// checking for available slot on a specific date
const checkAvailableSlot = async (date: string) => {
  const scheduledSlots = await Booking.find({ date }).select(
    "startTime endTime -_id"
  );

  // checking for the available slots
  const availableTimeSlot = getAvailableTimeSlots(scheduledSlots);

  return availableTimeSlot;
};

// getting all bookings from the db
const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate("user").populate("facility");
  return result;
};

// getting bookings of a user
const getBookingsOfUserFromDB = async (user: string) => {
  const result = await Booking.find({ user }).populate("facility");
  return result;
};

// canceling a booking
const cancelBookingFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isBooked: "canceled" },
    { new: true, runValidators: true }
  ).populate("facility");
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  checkAvailableSlot,
  getAllBookingsFromDB,
  getBookingsOfUserFromDB,
  cancelBookingFromDB,
};
