import express from "express";
import { getLikesCount, toggleLike } from "../controllers/like.controller.js";

const router = express.Router();

router.get("/", getLikesCount);
router.post("/", toggleLike);

export default router;
