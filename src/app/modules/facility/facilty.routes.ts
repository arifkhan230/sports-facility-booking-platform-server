import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { FacilityValidations } from "./facility.validation";
import { FacilityController } from "./facility.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidations.createFacilityValidationSchema),
  FacilityController.createFacility
);

router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidations.updateFacilityValidationSchema),
  FacilityController.updateFacility
);

router.delete("/:id", auth(USER_ROLE.admin), FacilityController.deleteFacility);

router.get("/", FacilityController.getAllFacility);

export const FacilityRoutes = router;
