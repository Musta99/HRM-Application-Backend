import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import {
  createLoanRequest,
  viewLoanRequestEmployee,
  viewLoanRequestByIdEmployee,
  updateLoanStatusByManager,
  viewLoanRequestToAccounts,
  loanDisbursementByAccounts,
} from "../loan/loan.controller.js";

const router = Router();

router.post("/", authMiddleware, createLoanRequest);
router.get("/", authMiddleware, viewLoanRequestEmployee);
router.get("/getById/:loanId", authMiddleware, viewLoanRequestByIdEmployee);
router.put("/updateStatus/:loanId", authMiddleware, updateLoanStatusByManager);
router.get("/allLoanRequests", authMiddleware, viewLoanRequestToAccounts);
router.put("/loanDisburse/:loanId", authMiddleware, loanDisbursementByAccounts);

export default router;
