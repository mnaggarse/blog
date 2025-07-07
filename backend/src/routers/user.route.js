import express from "express";
import { createUser, getUserById } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:id", getUserById);
router.post("/", createUser);

export default router;
