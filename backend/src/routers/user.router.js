import express from "express";
import {
  createPost,
  deletePostById,
  deleteUserPosts,
  getUserPosts,
  updatePost,
} from "../controllers/post.controller.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);

router.get("/:userId", getUserById);
router.delete("/:userId", deleteUser);

router.get("/:userId/posts", getUserPosts);
router.post("/:userId/posts", createPost);
router.delete("/:userId/posts", deleteUserPosts);

router.put("/:userId/posts/:postId", updatePost);
router.delete("/:userId/posts/:postId", deletePostById);

export default router;
