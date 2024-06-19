import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TUser, TUserLogin } from "./user.interface";
import { User } from "./user.model";
import jwt from "jsonwebtoken";

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TUserLogin) => {
  const user = await User.findOne({ email: payload?.email });
  console.log(user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const jwtPayload = {
    userId: "arif",
    role: "user",
  };

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
