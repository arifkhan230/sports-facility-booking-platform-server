import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body, req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking created successfully",
    data: result,
  });
});

const checkAvailableSlot = catchAsync(async (req, res) => {
  const date =
    (req.query.date as string) || new Date().toISOString().split("T")[0];
  const result = await BookingServices.checkAvailableSlot(date);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Availability checked successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();

  sendResponse(res, {
    success: result?.length ? true : false,
    statusCode: result?.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result?.length
      ? "Bookings retrieved successfully"
      : "No Data Found",
    data: result?.length ? result : [],
  });
});

const getBookingsOfUser = catchAsync(async (req, res) => {
  const { user } = req.params;
  const result = await BookingServices.getBookingsOfUserFromDB(user);

  sendResponse(res, {
    success: result?.length ? true : false,
    statusCode: result?.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result?.length
      ? "Bookings retrieved successfully"
      : "No Data Found",
    data: result?.length ? result : [],
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.cancelBookingFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking cancelled successfully",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  checkAvailableSlot,
  getAllBookings,
  getBookingsOfUser,
  cancelBooking,
};
