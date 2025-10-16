import { Router } from "express";
import {
  createNewTask,
  fetchTasksByUser,
  updateTaskStatus,
  fetchTasksByManager,
} from "./task.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createNewTask);
router.get("/", authMiddleware, fetchTasksByUser);
router.put("/updateTask/:taskId", authMiddleware, updateTaskStatus);
router.get("/fetchByManager", authMiddleware, fetchTasksByManager);

export default router;
