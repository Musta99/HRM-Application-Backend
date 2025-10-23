import { Router } from "express";
import {
  createNewMovementLog,
  viewMovementLog,
} from "../movementLog/movement_log.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createNewMovementLog);
router.get("/", authMiddleware, viewMovementLog);

export default router;
