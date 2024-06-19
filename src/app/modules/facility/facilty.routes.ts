import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { FacilityValidations } from "./facility.validation";
import { FacilityController } from "./facility.controller";

const router = Router();

router.post(
  "/",
  validateRequest(FacilityValidations.createFacilitySchema),
  FacilityController.createFacility
);

export const FacilityRoutes = router;
