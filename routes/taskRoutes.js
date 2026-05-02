import express from "express";
import {
  createTask,
  getMyTasks,
  updateTask,
  getAllTasks
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// 🔥 Admin → all tasks
router.get("/", protect, isAdmin, getAllTasks);

// 🔥 Member → own tasks
router.get("/my", protect, getMyTasks);

// 🔥 Admin create
router.post("/", protect, isAdmin, createTask);

// 🔥 Member update
router.put("/:id", protect, updateTask);

export default router;