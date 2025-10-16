import { ObjectId } from "mongodb";
import prisma from "../../prisma-client/prismaClient.js";

const createNewTask = async (req, res) => {
  try {
    const { title, description, status, priority, startDate, endDate } =
      req.body;

    if (!title || !description || !startDate) {
      return res.status(400).json({
        message: "Please prove all the input fields",
      });
    }

    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user.reportingBoss) {
      return res.status(400).json({
        message: "Please Add your reporting boss first",
      });
    }

    const task = await prisma.taskManagement.create({
      data: {
        title,
        description,
        status,
        priority,
        startDate: new Date(startDate),
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
          select: { name: true, email: true, id: true },
        },

        manager: {
          select: { name: true, email: true, id: true },
        },
      },
    });

    return res.status(200).json({
      message: "Your task has been successfully added",
      data: task,
    });
  } catch (err) {
    console.log("Error creating leave request:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { createNewTask };
