import prisma from "../../prisma-client/prismaClient.js";

const getAllUsers = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        message: "User fetched successfully",
        data: user,
      });
    }

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
