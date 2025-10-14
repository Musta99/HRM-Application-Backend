import { ObjectId } from "mongodb";
import prisma from "../../prisma-client/prismaClient.js";
import { uploadToCloudinary } from "../../utils/file_upload.js";

const createLeaveRequest = async (req, res) => {
  try {
    const { userId, startDate, endDate, reason, leaveType } = req.body;
    let supportingDocumentUrl = null;

    if (!userId || !startDate || !reason || !leaveType) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Handle file upload if there's a supporting document
    const docPath = req.files?.supportingDocument?.[0]?.path;
    console.log("File path:", docPath);
    if (docPath) {
      const uploadResult = await uploadToCloudinary(docPath);
      supportingDocumentUrl = uploadResult.url;
    }
    // Find user's manager automatically
    const user = await prisma.user.findUnique({ where: { id: userId } });
    // Check if employee has added manager to his profile or not
    if (!user.reportingBoss) {
      return res.status(500).json({
        message: "Please add a manager to your profile to apply for leave",
      });
    }

    const newLeaveRequest = await prisma.leaveRequest.create({
      data: {
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        reason,
        leaveType,
        status: "PENDING",
        employee: {
          connect: {
            id: userId,
          },
        },
        manager: {
          connect: managerId ? { id: managerId } : undefined,
        },
        supportingDocument: supportingDocumentUrl,
      },

      include: {
        employee: {
          select: { id: true, name: true, email: true },
        },
        manager: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return res.status(201).json({
      message: "Leave request created successfully",
      leaveRequest: newLeaveRequest,
    });
  } catch (err) {
    console.log("Error creating leave request:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// View leave request for employee
const viewLeaveRequest = async (req, res) => {
  const { managerId } = req.params;
  console.log(managerId);
  try {
    const allLeaves = await prisma.leaveRequest.findMany({
      where: { managerId: new ObjectId(managerId) },
    });

    return res.status(200).json({
      message: "successfully fetched",
      data: allLeaves,
    });
  } catch (err) {
    console.log("Error fetching leave request:", err);
    return res.status(500).json({ err: "Internal server error" });
  }
};

export { createLeaveRequest, viewLeaveRequest };
