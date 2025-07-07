import express from "express";
import {
  createPost,
  deleteAllPosts,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/", deleteAllPosts);
router.delete("/:id", deletePostById);

export default router;
