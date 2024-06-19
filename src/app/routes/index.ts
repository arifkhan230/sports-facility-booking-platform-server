import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { FacilityRoutes } from "../modules/facility/facilty.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/facility",
    route: FacilityRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
