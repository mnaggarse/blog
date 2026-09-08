import type { Request, Response, NextFunction } from "express";
import * as commentService from "../services/comment.service.js";
import * as postService from "../services/post.service.js";
import * as userService from "../services/user.service.js";

export const addCommentHandler = async (
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

    const { userId, content } = req.body || {};
    const numericUserId = Number(userId);

    if (!userId || isNaN(numericUserId) || !content || typeof content !== "string" || !content.trim()) {
      res.status(400).json({
        message: "Validation error: Valid userId and non-empty content are required.",
      });
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

    const comment = await commentService.addComment({
      content: content.trim(),
      userId: numericUserId,
      postId,
    });

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const deleteCommentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const commentId = Number(id);

    if (isNaN(commentId)) {
      res.status(400).json({ message: "Invalid comment ID format." });
      return;
    }

    const deletedComment = await commentService.deleteComment(commentId);

    if (!deletedComment) {
      res.status(404).json({ message: "Comment not found." });
      return;
    }

    res.status(200).json({ message: "Comment deleted successfully", comment: deletedComment });
  } catch (error) {
    next(error);
  }
};
