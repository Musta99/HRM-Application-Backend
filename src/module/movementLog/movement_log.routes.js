import { Router } from "express";
import { createNewMovementLog } from "../movementLog/movement_log.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createNewMovementLog);

export default router;
