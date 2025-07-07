import * as PostModel from "../models/post.model.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error in getAllPosts controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createPost = async (req, res) => {
  const { title, description, image, content, user_id } = req.body;
  try {
    await PostModel.createPost({ title, description, image, content, user_id });
    res.status(200).json({ message: "Post created successfully" });
  } catch (err) {
    console.error("Error in createPost controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};