import * as LikeModel from "../models/like.model.js";
import * as PostModel from "../models/post.model.js";
import * as UserModel from "../models/user.model.js";

export const getPostLikes = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await PostModel.getPostById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const likesCount = await LikeModel.getPostLikes(postId);
    res.status(200).json(likesCount);
  } catch (err) {
    console.error("Error in getLikesCount controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleLike = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const user = await UserModel.getUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const post = await PostModel.getPostById(postId);
    if (!post) return res.status(400).json({ message: "Post not found" });

    const isLiked = await LikeModel.isLiked({ userId, postId });

    if (isLiked) {
      await LikeModel.removeLike({ userId, postId });
      res.status(200).json({ message: "Like removed successfully" });
    } else {
      await LikeModel.addLike({ userId, postId });
      res.status(200).json({ message: "Like added successfully" });
    }
  } catch (err) {
    console.error("Error in toggleLike controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
