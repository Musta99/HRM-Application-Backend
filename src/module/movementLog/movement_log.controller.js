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

export { createNewMovementLog };
