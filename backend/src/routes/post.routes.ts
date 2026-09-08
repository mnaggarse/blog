import { Router } from "express";
import {
  createPostHandler,
  getAllPostsHandler,
  getPostByIdHandler,
  updatePostHandler,
  deletePostHandler,
} from "../controllers/post.controller.js";
import { toggleLikeHandler } from "../controllers/like.controller.js";
import { addCommentHandler } from "../controllers/comment.controller.js";

const router = Router();

// Post CRUD
router.post("/", createPostHandler);
router.get("/", getAllPostsHandler);
router.get("/:id", getPostByIdHandler);
router.put("/:id", updatePostHandler);
router.delete("/:id", deletePostHandler);

// Post Likes
router.post("/:id/like", toggleLikeHandler);

// Post Comments
router.post("/:id/comments", addCommentHandler);

export default router;
