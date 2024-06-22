import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { User } from "./user.model";

// creating new user
const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered successfully",
    data: result,
  });
});

// login user
const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUser(req.body);
  const user = await User.findOne({ email: req?.body?.email }).select(
    "-password"
  );
  const { accessToken } = result;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    token: accessToken,
    data: user,
  });
});

export const UserControllers = {
  createUser,
  loginUser,
};
