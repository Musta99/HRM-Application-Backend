import { Router } from "express";
import { getAllUsers } from "./users.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

// Route to get all users
router.get("/", getAllUsers);
router.get("/:id", authMiddleware, getAllUsers);

export default router;
