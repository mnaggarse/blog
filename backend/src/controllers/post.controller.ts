import type { Request, Response, NextFunction } from "express";
import * as postService from "../services/post.service.js";
import * as userService from "../services/user.service.js";

export const createPostHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, imageUrl, description, content, userId, tag } = req.body || {};

    if (!title || !imageUrl || !description || !content || !userId) {
      res.status(400).json({
        message:
          "Validation error: title, imageUrl, description, content, and userId are required.",
      });
      return;
    }

    const numericUserId = Number(userId);
    if (isNaN(numericUserId)) {
      res.status(400).json({ message: "Invalid userId format." });
      return;
    }

    const user = await userService.getUserById(numericUserId);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const post = await postService.createPost({
      title,
      imageUrl,
      description,
      content,
      userId: numericUserId,
      tag,
    });

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const getAllPostsHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPostByIdHandler = async (
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

    const post = await postService.getPostById(postId);

    if (!post) {
      res.status(404).json({ message: "Post not found." });
      return;
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const updatePostHandler = async (
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

    const { title, imageUrl, description, content, tag } = req.body || {};

    const updatedPost = await postService.updatePost(postId, {
      ...(title !== undefined && { title }),
      ...(imageUrl !== undefined && { imageUrl }),
      ...(description !== undefined && { description }),
      ...(content !== undefined && { content }),
      ...(tag !== undefined && { tag }),
    });

    if (!updatedPost) {
      res.status(404).json({ message: "Post not found." });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

export const deletePostHandler = async (
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

    const deletedPost = await postService.deletePost(postId);

    if (!deletedPost) {
      res.status(404).json({ message: "Post not found." });
      return;
    }

    res.status(200).json({ message: "Post deleted successfully", post: deletedPost });
  } catch (error) {
    next(error);
  }
};
