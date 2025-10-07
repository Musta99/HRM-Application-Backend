import prisma from "../../prisma-client/prismaClient.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    console.log(users);
     res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    console.log("Error fetching users:", err);
      res.status(500).json({ err });
  }
};

export { getAllUsers };

console.log("Helo")
