import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { uploadDocuments } from "./documents.controller.js";

const router = Router();

router.post("/upload", authMiddleware, uploadDocuments);

export default router;
