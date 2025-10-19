import { ObjectId } from "mongodb";
import prisma from "../../prisma-client/prismaClient.js";

// Create Loan Request
const createLoanRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("user id is:", userId);
    const { loanTenure, loanAmount, emiAmount, reason } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    console.log("Found User is: ", user);

    if (!user.reportingBoss) {
      return res.status(400).json({
        message: "Please add manager first to request loan",
      });
    }

    const reqLoan = await prisma.loanManagement.create({
      data: {
        loanTenure,
        loanAmount,
        emiAmount,
        reason,
        employee: {
          connect: {
            id: userId,
          },
        },

        manager: {
          connect: {
            id: user.reportingBoss,
          },
        },
      },

      include: {
        employee: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },

        manager: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return res.status(201).json({
      message: "Successfully created loan request",
      data: reqLoan,
    });
  } catch (err) {
    console.log("Some Error occured", err);
    return res.status(500).json({
      message: `Some Error occured: ${err}`,
    });
  }
};

// View Loan Request for employee
const viewLoanRequestEmployee = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;

    let filters = {
      userId: new ObjectId(userId),
    };

    if (status) {
      filters.status = status;
    }

    const loans = await prisma.loanManagement.findMany({
      where: filters,
    });

    return res.status(200).json({
      messages: "Successfully fetched Data",
      data: loans,
    });
  } catch (err) {
    console.log("Some Error occured", err);
    return res.status(500).json({
      message: `Some Error occured: ${err}`,
    });
  }
};

// Fetch loan request by Id for Employee
const viewLoanRequestByIdEmployee = async (req, res) => {
  try {
    const userId = req.user.id;
    const { loanId } = req.params;

    const loans = await prisma.loanManagement.findUnique({
      where: {
        userId: new ObjectId(userId),
        id: new ObjectId(loanId),
      },
    });

    return res.status(200).json({
      messages: "Successfully fetched Data",
      data: loans,
    });
  } catch (err) {
    console.log("Some Error occured", err);
    return res.status(500).json({
      message: `Some Error occured: ${err}`,
    });
  }
};

export {
  createLoanRequest,
  viewLoanRequestEmployee,
  viewLoanRequestByIdEmployee,
};
