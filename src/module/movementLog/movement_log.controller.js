import { ObjectId } from "mongodb";
import prisma from "../../prisma-client/prismaClient.js";

// Create a new movement log
const createNewMovementLog = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User Id is: ", userId);
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const meetingTime = `${hour}:${minutes}`;

    const { type, location, purpose } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "No user found in this id",
      });
    }

    const movementLog = await prisma.movementLog.create({
      data: {
        type,
        time: meetingTime,
        location,
        purpose,
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
            name: true,
            email: true,
          },
        },
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return res.status(201).json({
      message: "Movement log successfully created",
      data: movementLog,
    });
  } catch (err) {
    console.log("Some Error occured", err);
    return res.status(500).json({
      message: `Some Error occured: ${err}`,
    });
  }
};

// View all the movement log -- Employee
const viewMovementLog = async (req, res) => {
  try {
    const userId = req.user.id;
    const allMovementLog = await prisma.movementLog.findMany({
      where: {
        userId: new ObjectId(userId),
      },
    });

    return res.status(200).json({
      message: "Successfully fetched all the movement logs",
      data: allMovementLog,
    });
  } catch (err) {
    console.log("Some Error occured", err);
    return res.status(500).json({
      message: `Some Error occured: ${err}`,
    });
  }
};

// update movement log by employee
const updateMovementLog = async (req, res) => {
  try {
    const userId = req.user.id;
    const { movementLogId } = req.params;
    const { status } = req.body;

    const updatedData = {
      status,
    };

    const updateLog = await prisma.movementLog.update({
      where: {
        userId: new ObjectId(userId),
        id: new ObjectId(movementLogId),
      },
      data: updatedData,
    });

    console.log(updateLog);

    return res.status(200).json({
      message: "Successfully updated movement log",
      data: updateLog,
    });
  } catch (err) {
    console.log("Some Error occured", err);
    return res.status(500).json({
      message: `Some Error occured: ${err}`,
    });
  }
};

export { createNewMovementLog, viewMovementLog, updateMovementLog };
