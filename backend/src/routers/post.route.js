import express from "express";
import { createPost, getAllPosts, getPostById, deleteAllPosts, deletePostById } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.delete("/", deleteAllPosts);
router.delete("/:id", deletePostById);

export default router;
