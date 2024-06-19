import { Router } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UsersValidations } from "./user.validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(UsersValidations.createUserValidationSchema),
  UserControllers.createUser
);

router.post(
  "/login",
  validateRequest(UsersValidations.userLoginValidationSchema),
  UserControllers.loginUser
);

export const UserRoutes = router;
