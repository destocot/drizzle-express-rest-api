import type { NextFunction, Request, Response } from "express";
import postsService from "./posts.service";
import { NotFoundError } from "../../lib/errors";
import {
  CreatePostSchema,
  DeletePostSchema,
  RetrievePostSchema,
  UpdatePostSchema,
} from "./posts.schema";

class PostsController {
  async createPost(
    req: Request<{}, {}, CreatePostSchema["body"]>,
    res: Response
  ) {
    const { user, body } = req;

    const newPost = await postsService.create(user.sub, body);

    res.status(201);
    res.json({ data: newPost });
  }

  async retrievePosts(req: Request, res: Response) {
    const { user } = req;

    const posts = await postsService.findAll(user.sub);

    res.status(200);
    res.json({ data: posts });
  }

  async retrievePost(
    req: Request<RetrievePostSchema["params"]>,
    res: Response,
    next: NextFunction
  ) {
    const { user, params } = req;

    const post = await postsService.findOne(user.sub, params.id);
    if (post.length === 0) return next(new NotFoundError("Post not found"));

    res.status(200);
    res.json({ data: post });
  }

  async updatePost(
    req: Request<UpdatePostSchema["params"], {}, UpdatePostSchema["body"]>,
    res: Response
  ) {
    const { user, params, body } = req;

    const updatedPost = await postsService.update(user.sub, params.id, body);

    res.status(200);
    res.json({ data: updatedPost });
  }

  async deletePost(req: Request<DeletePostSchema["params"]>, res: Response) {
    const { user, params } = req;

    const deletedPost = await postsService.remove(user.sub, params.id);

    res.status(200);
    res.json({ data: deletedPost });
  }
}

const postsController = new PostsController();

export default postsController;
