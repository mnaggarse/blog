import * as PostModel from "../models/post.model.js";
import * as UserModel from "../models/user.model.js";

export const getAllPosts = async (_req, res) => {
  try {
    const posts = await PostModel.getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error in getAllPosts controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.getUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await PostModel.getUserPosts(userId);
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error in getUserPosts controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await PostModel.getPostById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (err) {
    console.error("Error in getPostById controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createPost = async (req, res) => {
  const { userId } = req.params;
  const { title, description, image, content } = req.body;

  try {
    const user = await UserModel.getUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await PostModel.createPost({ title, description, image, content, userId });
    res.status(200).json({ message: "Post created successfully" });
  } catch (err) {
    console.error("Error in createPost controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { title, description, image, content } = req.body;

  try {
    const post = await PostModel.getPostById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    await PostModel.updatePost({ title, description, image, content, postId });
    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    console.error("Error in updatePost controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUserPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.getUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await PostModel.getUserPosts(userId);
    if (posts.length == 0) return res.status(400).json({ message: "There is no posts" });

    await PostModel.deleteUserPosts(userId);
    res.status(200).json({ message: "All posts deleted successfully" });
  } catch (err) {
    console.error("Error in deleteUserPosts controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePostById = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const post = await PostModel.getPostById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user_id != userId)
      return res.status(400).json({ message: "You are not allowed to delete this post" });

    await PostModel.deletePostById({ userId, postId });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error in deletePostById controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
