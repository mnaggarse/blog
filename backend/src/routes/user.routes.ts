import { Router } from "express";
import {
  createUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  getUserPostsHandler,
  updateUserHandler,
  deleteUserHandler,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/", createUserHandler);
router.get("/", getAllUsersHandler);
router.get("/:id", getUserByIdHandler);
router.get("/:id/posts", getUserPostsHandler);
router.put("/:id", updateUserHandler);
router.delete("/:id", deleteUserHandler);

export default router;
