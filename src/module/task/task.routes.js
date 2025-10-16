import { Router } from "express";
import { createNewTask } from "./task.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createNewTask);

export default router;
