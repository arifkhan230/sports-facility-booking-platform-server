import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "email is required" }).email(),
    password: z.string(),
    phone: z.string(),
    role: z.enum(["admin", "user"]),
    address: z.string(),
  }),
});

const userLoginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const UsersValidations = {
  createUserValidationSchema,
  userLoginValidationSchema,
};
