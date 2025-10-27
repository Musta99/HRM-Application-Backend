import { ObjectId } from "mongodb";
import prisma from "../../prisma-client/prismaClient.js";
import { uploadToCloudinary } from "../../utils/file_upload.js";
import path from "path";
import fs from "fs";

// upload any documents by authorized person (HR, Admin etc role)
const uploadDocuments = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, docType } = req.body;
    let document = null;
    let docFormat;
    let docSize;
    const user = await prisma.user.findUnique({
      where: {
        id: new ObjectId(userId),
      },
    });

    if (
      user.role !== "HR" &&
      user.role !== "ACCOUNTS" &&
      user.role !== "ADMIN"
    ) {
      console.log(user.role);
      return res.status(400).json({
        message: "you are an unauthorized person to upload documents",
      });
    }
    const docPath = req.files?.document?.[0]?.path;
    if (docPath) {
      const { size } = fs.statSync(docPath);
      docSize = (size / 1024).toFixed(2);
      docFormat = docPath.split(".").pop().split("-")[0];
      const uploadResult = await uploadToCloudinary(docPath);
      document = uploadResult.url;
    }

    const uploadedDoc = await prisma.documents.create({
      data: {
        title,
        description,
        userId,
        document,
        docFormat,
        docSize,
        docType,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Document has been uploaded successfully",
    });
  } catch (err) {
    console.log("Some Error occured", err);
    return res.status(500).json({
      message: `Some Error occured: ${err}`,
    });
  }
};

// Update any document information
const updateDocInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const { docId } = req.params;
    const { title, description } = req.body;
    const updatedData = {
      title,
      description,
    };

    // if this documents belongs to you, only then you can update it
    const document = await prisma.documents.update({
      where: {
        userId: new ObjectId(userId),
        id: new ObjectId(docId),
      },
      data: updatedData,
    });

    return res.status(200).json({
      message: "document updated successfully",
      data: document,
    });
  } catch (err) {
    console.log("Some Error occured", err);
    return res.status(500).json({
      message: `Some Error occured: ${err}`,
    });
  }
};

export { uploadDocuments, updateDocInfo };
