import { Router } from "express";
import { createNewUser } from "./employee.auth.js";

const router = Router();

// Route to add a new employee
router.post("/add-employee", createNewUser);

export default router;
