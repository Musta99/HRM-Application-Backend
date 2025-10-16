import { Router } from "express";
import {
  createNewTask,
  fetchTasksByUser,
  updateTaskStatus,
} from "./task.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createNewTask);
router.get("/", authMiddleware, fetchTasksByUser);
router.put("/updateTask/:taskId", authMiddleware, updateTaskStatus);

export default router;
