import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { FacilityValidations } from "./facility.validation";
import { FacilityController } from "./facility.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/",
  validateRequest(FacilityValidations.createFacilityValidationSchema),
  FacilityController.createFacility
);

router.put(
  "/:id",
  validateRequest(FacilityValidations.updateFacilityValidationSchema),
  FacilityController.updateFacility
);

router.delete("/:id", FacilityController.deleteFacility);

router.get("/", auth(USER_ROLE.user), FacilityController.getAllFacility);

export const FacilityRoutes = router;
