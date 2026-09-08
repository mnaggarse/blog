import { Router } from "express";
import { deleteCommentHandler } from "../controllers/comment.controller.js";

const router = Router();

router.delete("/:id", deleteCommentHandler);

export default router;
