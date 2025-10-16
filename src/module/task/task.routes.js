import { Router } from "express";
import { createNewTask } from "./task.controller.js";

const router = Router();

router.post("/", createNewTask);

export default router;
