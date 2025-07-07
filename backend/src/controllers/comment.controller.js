import * as CommentModel from "../models/comment.model.js";

export const getAllComments = async (_req, res) => {
  try {
    const comments = await CommentModel.getAllComments();
    res.status(200).json(comments);
  } catch (err) {
    console.error("Error in getAllComments controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createComment = async (req, res) => {
  const { content, user_id, post_id } = req.body;

  try {
    await CommentModel.createComment({ content, user_id, post_id });
    res.status(200).json({ message: "Comment created successfully" });
  } catch (err) {
    console.error("Error in createComment controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
