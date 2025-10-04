import { Router } from "express";
import { signUpUser } from "./employee.auth.js";

const router = Router();

// Route to add a new employee
router.post("/sign-up", signUpUser);

export default router;
