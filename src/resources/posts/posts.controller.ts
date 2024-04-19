import type { Request, Response } from 'express';
import postsService from './posts.service';
import { createPostDto } from './dto/create-post.dto';
import { updatePostDto } from './dto/update-post.dto';

//cljeuoqdd8q7gqrnstyohhwkf

class PostsController {
  async createPost(req: Request, res: Response) {
    const userId = req.body.userId;
    if (!userId) return res.sendStatus(400);

    const body = createPostDto.safeParse(req.body);
    if (!body.success) return res.sendStatus(400);

    const newPost = await postsService.create(userId, body.data);

    res.status(201);
    res.json({ data: newPost });
  }

  async retrievePosts(req: Request, res: Response) {
    const userId = req.body.userId;
    if (!userId) return res.sendStatus(400);

    const posts = await postsService.findAll(userId);

    res.status(200);
    res.json({ data: posts });
  }

  async retrievePost(req: Request, res: Response) {
    const userId = req.body.userId;
    if (!userId) return res.sendStatus(400);

    const postId = req.params.id;
    if (!postId) return res.sendStatus(400);

    const post = await postsService.findOne(userId, postId);
    if (post.length === 0) return res.sendStatus(404);

    res.status(200);
    res.json({ data: post });
  }

  async updatePost(req: Request, res: Response) {
    const userId = req.body.userId;
    if (!userId) return res.sendStatus(400);

    const postId = req.params.id;
    if (!postId) return res.sendStatus(400);

    const body = updatePostDto.safeParse(req.body);
    if (!body.success) return res.sendStatus(400);

    const updatedPost = await postsService.update(userId, postId, body.data);

    res.status(200);
    res.json({ data: updatedPost });
  }

  async deletePost(req: Request, res: Response) {
    const userId = req.body.userId;
    if (!userId) return res.sendStatus(400);

    const postId = req.params.id;
    if (!postId) return res.sendStatus(400);

    const deletedPost = await postsService.remove(userId, postId);

    res.status(200);
    res.json({ data: deletedPost });
  }
}

const postsController = new PostsController();

export default postsController;
