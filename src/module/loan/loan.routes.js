import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import {
  createLoanRequest,
  viewLoanRequestEmployee,
} from "../loan/loan.controller.js";

const router = Router();

router.post("/", authMiddleware, createLoanRequest);
router.get("/", authMiddleware, viewLoanRequestEmployee);

export default router;
