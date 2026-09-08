import "dotenv/config";
import express from "express";
import postRoutes from "./routes/post.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Base health check route
app.get("/", (_req, res) => {
  res.json({ message: "Blog API server is running" });
});

// Blog posts API routes
app.use("/api/posts", postRoutes);

// Global Error Handler
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error("Unhandled error:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err?.message });
  },
);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
