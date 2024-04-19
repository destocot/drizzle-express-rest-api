import { Router } from "express";
import postsController from "./posts.controller";
import { validateResource } from "../../middleware/validate-resource";
import {
  createPostSchema,
  deletePostSchema,
  retrievePostSchema,
  updatePostSchema,
} from "./posts.schema";

const router = Router();

router.post(
  "/",
  validateResource(createPostSchema),
  postsController.createPost
);

router.get("/", postsController.retrievePosts);

router.get(
  "/:id",
  validateResource(retrievePostSchema),
  postsController.retrievePost
);

router.patch(
  "/:id",
  validateResource(updatePostSchema),
  postsController.updatePost
);

router.delete(
  "/:id",
  validateResource(deletePostSchema),
  postsController.deletePost
);

export default router;
