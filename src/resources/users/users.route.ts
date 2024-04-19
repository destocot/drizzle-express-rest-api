import { Router } from "express";
import usersController from "./users.controller";
import { validateResource } from "../../middleware/validate-resource";
import {
  createUserSchema,
  deleteUserSchema,
  retrieveUserSchema,
  updateUserSchema,
} from "./user.schema";

const router = Router();

router.post(
  "/",
  validateResource(createUserSchema),
  usersController.createUser
);

router.get("/", usersController.retrieveUsers);

router.get(
  "/:id",
  validateResource(retrieveUserSchema),
  usersController.retrieveUser
);

router.patch(
  "/:id",
  validateResource(updateUserSchema),
  usersController.updateUser
);

router.delete(
  "/:id",
  validateResource(deleteUserSchema),
  usersController.deleteUser
);

export default router;
