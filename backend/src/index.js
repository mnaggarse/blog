import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routers/user.route.js";
import postRoutes from "./routers/post.route.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
