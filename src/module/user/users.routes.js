import { Router } from "express";
import { getAllUsers } from "./users.controller.js";

const router = Router();

// Route to get all users
router.get("/", getAllUsers);

export default router;
