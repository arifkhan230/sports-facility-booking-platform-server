import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { FacilityValidations } from "./facility.validation";
import { FacilityController } from "./facility.controller";

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

router.get("/", FacilityController.getAllFacility);

export const FacilityRoutes = router;
