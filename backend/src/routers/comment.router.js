import express from "express";
import { createComment, getAllComments } from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/", getAllComments);
router.post("/", createComment);

export default router;
