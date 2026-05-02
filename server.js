import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// 🔥 CORS fix (important for frontend)
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// 🔥 DB connect
connectDB();

// 🔗 Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// 🔥 ROOT route (optional but useful for testing)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// 🔥 PORT FIX (VERY IMPORTANT for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});