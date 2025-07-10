import * as UserModel from "../models/user.model.js";

export const getAllUsers = async (_req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error in getAllUsers controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.getUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Error in getAllUsers controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, image, description } = req.body;

  try {
    const user = await UserModel.getUserByEmail(email);
    if (user) return res.status(400).json({ message: "User already exists" });

    await UserModel.createUser({ name, email, password, image, description });
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error in createUser controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
