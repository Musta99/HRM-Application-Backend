import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { createLoanRequest } from "../loan/loan.controller.js";

const router = Router();

router.post("/", authMiddleware, createLoanRequest);

export default router;
