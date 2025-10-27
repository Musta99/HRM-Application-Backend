import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { uploadDocuments, updateDocInfo } from "./documents.controller.js";
import { upload } from "../../middleware/multer.middleware.js";

const router = Router();

router.post(
  "/upload",
  authMiddleware,
  upload.fields([
    {
      name: "document",
    },
  ]),

  uploadDocuments
);

router.put("/update/:docId", authMiddleware, updateDocInfo);

export default router;
