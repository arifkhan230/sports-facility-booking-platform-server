import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import validator from "validator";

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "{VALUE} is not valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: 0,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_routes)
  );
  next();
});

userSchema.post("save", function (doc, next) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (doc as any).password = undefined;
  next();
});

export const User = model<TUser>("User", userSchema);
