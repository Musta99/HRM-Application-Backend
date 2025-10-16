import { ObjectId } from "mongodb";
import prisma from "../../prisma-client/prismaClient.js";

const createNewTask = async (req, res) => {
  try {
    const { title, description, status, priority, startDate, endDate } =
      req.body;

    // if (!title || !description || !startDate) {
    //   return res.status(400).json({
    //     message: "Please prove all the input fields",
    //   });
    // }

    const userId = req.user.id;
    console.log(userId);
  } catch (err) {
    console.log("Error creating leave request:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { createNewTask };
