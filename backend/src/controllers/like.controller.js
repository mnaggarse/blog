import * as LikeModel from "../models/like.model.js";

export const getLikesCount = async (req, res) => {
  const { post_id } = req.body;

  try {
    const likesCount = await LikeModel.getLikesCount(post_id);
    res.status(200).json(likesCount);
  } catch (err) {
    console.error("Error in getLikesCount controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleLike = async (req, res) => {
  const { user_id, post_id } = req.body;

  try {
    const isLiked = await LikeModel.isLiked({ user_id, post_id });

    if (isLiked) {
      await LikeModel.removeLike({ user_id, post_id });
      res.status(200).json({ message: "Like removed successfully" });
    } else {
      await LikeModel.addLike({ user_id, post_id });
      res.status(200).json({ message: "Like added successfully" });
    }
  } catch (err) {
    console.error("Error in toggleLike controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
