import { z } from "zod";

// validation schema for create facility
const createFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "name is required" }),
    description: z.string({ required_error: "description is required" }),
    pricePerHour: z.number({ required_error: "price per hour is required" }),
    location: z.string({ required_error: "location is required" }),
    isDeleted: z.boolean().optional(),
  }),
});

// validation schema for update facility
const updateFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "name is required" }).optional(),
    description: z
      .string({ required_error: "description is required" })
      .optional(),
    pricePerHour: z
      .number({ required_error: "price per hour is required" })
      .optional(),
    location: z.string({ required_error: "location is required" }).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const FacilityValidations = {
  createFacilityValidationSchema,
  updateFacilityValidationSchema,
};
