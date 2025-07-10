import express from "express";
import {
  createComment,
  deleteCommentById,
  getPostComments,
} from "../controllers/comment.controller.js";
import { getPostLikes, toggleLike } from "../controllers/like.controller.js";
import {
  deletePostById,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:postId", getPostById);
router.patch("/:postId", updatePost);
router.delete("/:postId", deletePostById);

router.get("/:postId/comments", getPostComments);
router.post("/:postId/comments", createComment);
router.delete("/:postId/comments/:commentId", deleteCommentById);

router.get("/:postId/likes", getPostLikes);
router.post("/:postId/likes", toggleLike);

export default router;
