import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { createLeaveRequest } from "./leave.controller.js";
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

export default router;
