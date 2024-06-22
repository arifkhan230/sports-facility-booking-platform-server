import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TUser, TUserLogin } from "./user.interface";
import { User } from "./user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TUserLogin) => {
  const user = await User.findOne({ email: payload?.email }).select(
    "password role"
  );

  // checking if the user exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // checking password is correct or not
  const isPasswordValid = await bcrypt.compare(
    payload?.password,
    user?.password
  );

  if (!isPasswordValid) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password not matched");
  }

  const jwtPayload = {
    userId: user?._id,
    role: user?.role,
  };

  // creating jwt access token
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: config.jwt_access_expires_in as string,
  });

  return {
    accessToken,
    user,
  };
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
};
