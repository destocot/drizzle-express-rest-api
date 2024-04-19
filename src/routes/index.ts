import { Router } from "express";

import userRoutes from "../resources/users/users.route";
import authRoutes from "../resources/auth/auth.route";
import postRoutes from "../resources/posts/posts.route";
import { authGuard } from "../middleware/auth-guard";
import { NotFoundError } from "../lib/errors";

const router = Router();

router.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

router.use("/api/auth", authRoutes);

router.use("/api/users", authGuard, userRoutes);

router.use("/api/posts", authGuard, postRoutes);

router.all("*", () => {
  throw new NotFoundError("Route not found");
});

export default router;
