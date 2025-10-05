import { Router } from "express";
import { signUpUser, loginUser, updateUserDetails } from "./employee.auth.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

import { upload } from "../../middleware/multer.middleware.js";

const router = Router();

// Route to Signup and Login a new employee
router.post("/sign-up", signUpUser);
router.post("/login", loginUser);

// Route to update userDetails
router.put(
  "/update/:id",
  authMiddleware,
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
  ]),
  updateUserDetails
);

export default router;
