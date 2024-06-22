import httpStatus from "http-status";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";
import { TUserRole } from "../modules/user/user.interface";
import sendResponse from "../utils/sendResponse";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    const bearer = header && header.split(" ")[0];

    // check if the token is sent from client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized  !");
    }

    // checking if bearer is given
    if (bearer !== "Bearer") {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Authorization header must contain 'Bearer'  !"
      );
    }

    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_token as string
    ) as JwtPayload;

    const { role, userId } = decoded;

    // checking if the user is exist
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      sendResponse(res, {
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "You have no access to this route",
        data: undefined,
      });
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
