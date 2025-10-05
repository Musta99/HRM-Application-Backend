import { Router } from "express";
import { signUpUser, loginUser } from "./employee.auth.js";

const router = Router();

// Route to Signup and Login a new employee
router.post("/sign-up", signUpUser);
router.post("/login", loginUser);

export default router;
