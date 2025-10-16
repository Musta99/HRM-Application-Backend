import { Router } from "express";
import { createNewTask, fetchTasksByUser } from "./task.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createNewTask);
router.get("/", authMiddleware, fetchTasksByUser);

export default router;
