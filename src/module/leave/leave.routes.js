import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { createLeaveRequest } from "./leave.controller.js";

const router = Router();

// Route to create a new leave request
router.post("/", authMiddleware, createLeaveRequest);

export default router;
