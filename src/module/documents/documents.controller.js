import { ObjectId } from "mongodb";
import prisma from "../../prisma-client/prismaClient.js";

// upload any documents by authorized person (HR, Admin etc role)
const uploadDocuments = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
      where: {
        id: new ObjectId(userId),
      },
    });

    if (
      user.role !== "HR" ||
      user.role !== "ACCOUNTS" ||
      user.role !== "ADMIN"
    ) {
      return res.status(400).json({
        message: "you are an unauthorized person to upload documents",
      });
    }

    console.log(user);
  } catch (err) {
    console.log("Some Error occured", err);
    return res.status(500).json({
      message: `Some Error occured: ${err}`,
    });
  }
};

export { uploadDocuments };
