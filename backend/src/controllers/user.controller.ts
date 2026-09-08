import type { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service.js";

export const createUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, bio, avatarUrl } = req.body || {};

    if (!name || !email) {
      res.status(400).json({
        message: "Validation error: name and email are required.",
      });
      return;
    }

    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ message: "User with this email already exists." });
      return;
    }

    const user = await userService.createUser({
      name,
      email,
      bio: bio ?? null,
      avatarUrl: avatarUrl ?? null,
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsersHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = Number(id);

    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID format." });
      return;
    }

    const user = await userService.getUserById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserPostsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = Number(id);

    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID format." });
      return;
    }

    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const posts = await userService.getUserPosts(userId);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const updateUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = Number(id);

    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID format." });
      return;
    }

    const { name, bio, avatarUrl } = req.body || {};

    const updatedUser = await userService.updateUser(userId, {
      ...(name !== undefined && { name }),
      ...(bio !== undefined && { bio }),
      ...(avatarUrl !== undefined && { avatarUrl }),
    });

    if (!updatedUser) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = Number(id);

    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID format." });
      return;
    }

    const deletedUser = await userService.deleteUser(userId);

    if (!deletedUser) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    next(error);
  }
};
