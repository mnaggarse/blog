import express from "express";
import { createPost, getAllPosts } from "../controllers/post.controller.js";
import { deletePostById } from "../models/post.model.js";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", createPost);
router.delete("/:id", deletePostById)

export default router;
