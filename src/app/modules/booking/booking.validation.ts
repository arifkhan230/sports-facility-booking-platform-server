import { z } from "zod";

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: 'Invalid time format, expected "HH:MM" in 24 hours format ',
  }
);

// validation schema for create booking
const createBookingValidationSchema = z.object({
  body: z
    .object({
      facility: z.string({ required_error: "Facility is required" }),
      date: z.string({ required_error: "Date is required" }).refine(
        (date) => {
          const regex = /^\d{4}-\d{2}-\d{2}$/;
          return regex.test(date);
        },
        {
          message: "Invalid date format. Expected format: YYYY-MM-DD",
        }
      ),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1999-06-12T${body.startTime}:00`);
        const end = new Date(`1999-06-12T${body.endTime}:00`);
        return end > start;
      },
      {
        message: "Start time should be before End time",
      }
    ),
});

export const BookingValidations = {
  createBookingValidationSchema,
};
