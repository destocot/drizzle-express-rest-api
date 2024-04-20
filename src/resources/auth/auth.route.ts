import { Router } from "express";

import authController from "@/resources/auth/auth.controller";
import { validateResource } from "@/middleware/validate-resource";
import { createUserSchema } from "@/resources/users/user.schema";
import { signinSchema } from "@/resources/auth/auth.schema";
const router = Router();

router.post(
  "/signup",
  validateResource(createUserSchema),
  authController.signup
);

router.post("/signin", validateResource(signinSchema), authController.signin);

router.post("/signout", authController.signout);

export default router;
