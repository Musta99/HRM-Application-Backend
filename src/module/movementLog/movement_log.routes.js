import { Router } from "express";
import {
  createNewMovementLog,
  viewMovementLog,
  updateMovementLog,
} from "../movementLog/movement_log.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createNewMovementLog);
router.get("/", authMiddleware, viewMovementLog);
router.put("/updateLog/:movementLogId", authMiddleware, updateMovementLog);

export default router;
