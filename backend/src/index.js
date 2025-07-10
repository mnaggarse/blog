import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import postRoutes from "./routers/post.router.js";
import userRoutes from "./routers/user.router.js";

dotenv.config();
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routers
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
