import type { Request, Response, NextFunction } from "express";
import * as likeService from "../services/like.service.js";
import * as postService from "../services/post.service.js";
import * as userService from "../services/user.service.js";

export const toggleLikeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const postId = Number(id);

    if (isNaN(postId)) {
      res.status(400).json({ message: "Invalid post ID format." });
      return;
    }

    const { userId } = req.body || {};
    const numericUserId = Number(userId);

    if (!userId || isNaN(numericUserId)) {
      res.status(400).json({ message: "Validation error: Valid userId is required." });
      return;
    }

    const user = await userService.getUserById(numericUserId);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const post = await postService.getPostById(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found." });
      return;
    }

    const result = await likeService.toggleLike(numericUserId, postId);
    res.status(200).json({
      message: `Post ${result.status} successfully`,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
