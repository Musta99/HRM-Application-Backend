import { ObjectId } from "mongodb";
import prisma from "../../prisma-client/prismaClient.js";
import { uploadToCloudinary } from "../../utils/file_upload.js";
import path from "path";
import fs from "fs";

// upload any documents by authorized person (HR, Admin etc role)
const uploadDocuments = async (req, res) => {
  try {
    const userId = req.user.id;
    // const { title, description, uploadedBy } = req.body;
    let document = null;
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
    const { size } = fs.statSync(docPath);
    const fileSizeInKB = (size / 1024).toFixed(2);

    const fileExt = docPath.split(".").pop().split("-")[0];
    console.log(fileExt);
    console.log("File Size: ", fileSizeInKB);
    console.log("File path:", docPath);

    // if (docPath) {
    //   const uploadResult = await uploadToCloudinary(docPath);
    //   console.log(uploadResult);
    // }

    console.log(user);
  } catch (err) {
    console.log("Some Error occured", err);
    return res.status(500).json({
      message: `Some Error occured: ${err}`,
    });
  }
};

export { uploadDocuments };
