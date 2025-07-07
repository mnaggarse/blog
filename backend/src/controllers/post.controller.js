import * as PostModel from "../models/post.model.js";

export const getAllPosts = async (_req, res) => {
  try {
    const posts = await PostModel.getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error in getAllPosts controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostModel.getPostById(id);
    res.status(200).json(post);
  } catch (err) {
    console.error("Error in getPostById controller:", err);
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

export const deleteAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.getAllPosts();
    if (!posts) return res.status(400).json({ message: "There is no posts" });

    await PostModel.deleteAllPosts();
    res.status(200).json({ message: "All posts deleted successfully" });
  } catch (err) {
    console.error("Error in deleteAllPosts controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostModel.getPostById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    await PostModel.deletePostById(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error in deleteAllPosts controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
