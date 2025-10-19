import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import {
  createLoanRequest,
  viewLoanRequestEmployee,
  viewLoanRequestByIdEmployee,
} from "../loan/loan.controller.js";

const router = Router();

router.post("/", authMiddleware, createLoanRequest);
router.get("/", authMiddleware, viewLoanRequestEmployee);
router.get("/getById/:loanId", authMiddleware, viewLoanRequestByIdEmployee);

export default router;
