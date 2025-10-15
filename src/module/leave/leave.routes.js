import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import {
  createLeaveRequest,
  viewLeaveRequest,
  leaveAppliedByEmployee,
  updateLeaveStatus,
} from "./leave.controller.js";
import { upload } from "../../middleware/multer.middleware.js";

const router = Router();

// Route to create a new leave request
router.post(
  "/",
  authMiddleware,
  upload.fields([
    {
      name: "supportingDocument",
    },
  ]),
  createLeaveRequest
);

router.get("/getEmployeeLeaves", authMiddleware, leaveAppliedByEmployee);
router.get("/:managerId", authMiddleware, viewLeaveRequest);
router.get("/updateLeaveStatus/:leaveId", authMiddleware, updateLeaveStatus);

export default router;
