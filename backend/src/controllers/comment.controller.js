import * as CommentModel from "../models/comment.model.js";
import * as PostModel from "../models/post.model.js";
import * as UserModel from "../models/user.model.js";

export const getPostComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await PostModel.getPostById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comments = await CommentModel.getCommentsByPostId(postId);
    res.status(200).json(comments);
  } catch (err) {
    console.error("Error in getPostComments controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createComment = async (req, res) => {
  const { postId } = req.params;
  const { content, userId } = req.body;

  try {
    const user = await UserModel.getUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const post = await PostModel.getPostById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    await CommentModel.createComment({ content, userId, postId });
    res.status(200).json({ message: "Comment created successfully" });
  } catch (err) {
    console.error("Error in createComment controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
