import { Router } from "express";

import authController from "./auth.controller";
import { validateResource } from "../../middleware/validate-resource";
import { createUserSchema } from "../users/user.schema";
import { signinSchema } from "./auth.schema";
const router = Router();

router.post(
  "/signup",
  validateResource(createUserSchema),
  authController.signup
);

router.post("/signin", validateResource(signinSchema), authController.signin);

router.post("/signout", authController.signout);

export default router;
