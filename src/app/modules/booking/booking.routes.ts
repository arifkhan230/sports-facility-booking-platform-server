import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidations } from "./booking.validation";
import { BookingController } from "./booking.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/bookings",
  auth(USER_ROLE.user),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingController.createBooking
);

router.get("/check-availability", BookingController.checkAvailableSlot);

router.get(
  "/bookings",
  auth(USER_ROLE.admin),
  BookingController.getAllBookings
);

router.get(
  "/bookings/:user",
  auth(USER_ROLE.user),
  BookingController.getBookingsOfUser
);

export const BookingRoutes = router;
