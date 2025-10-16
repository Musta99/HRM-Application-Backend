import { ObjectId } from "mongodb";
import prisma from "../../prisma-client/prismaClient.js";

// Create a new Task
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

// Fetch All Task for specific user
const fetchTasksByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);

    const tasksByUser = await prisma.taskManagement.findMany({
      where: {
        userId: new ObjectId(userId),
      },
    });

    if (!tasksByUser) {
      return res.status(400).json({
        message: "No task found on this id",
      });
    }

    return res.status(200).json({
      message: "Successfully fetched tasks",
      data: tasksByUser,
    });
  } catch (err) {
    console.log("Error creating leave request:", err);
    return res.status(500).json({ err: "Internal server error" });
  }
};

export { createNewTask, fetchTasksByUser };
