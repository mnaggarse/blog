import * as UserModel from "../models/user.model.js";

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.getUserById(id);
    res.status(200).json(user);
  } catch (err) {
    console.error("Error in createUser controller:", err);
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
