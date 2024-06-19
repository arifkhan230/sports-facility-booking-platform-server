import { z } from "zod";

const createFacilitySchema = z.object({
  body: z.object({
    name: z.string({ required_error: "name is required" }),
    description: z.string({ required_error: "description is required" }),
    pricePerHour: z.number({ required_error: "price per hour is required" }),
    location: z.string({ required_error: "location is required" }),
    isDeleted: z.string().optional(),
  }),
});

export const FacilityValidations = {
  createFacilitySchema,
};
