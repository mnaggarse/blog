import express from "express";
import { createPost, getUserPosts, deleteUserPosts, deletePostById } from "../controllers/post.controller.js";
import { createUser, getAllUsers, getUserById } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:userId", getUserById);
router.get("/:userId/posts", getUserPosts);
router.post("/:userId/posts", createPost);
router.delete("/:userId/posts", deleteUserPosts);
router.delete("/:userId/posts/:postId", deletePostById);

export default router;
