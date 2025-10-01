import prisma from "../../prisma-client/prismaClient.js";

const createNewUser = async (req, res) => {
  const { name, email, phone, address, role, department, reportingBoss } =
    req.body;

          if (!name || !email || !phone || !address || !role || !department) {
              return res.status(400).json({ error: "All fields are required" });
          }
    const newUser =  await prisma.user.create({
      data: {
        name,
        email,
        phone,
        address,
        role,
        department,
        reportingBoss: null,
      },
    });

  console.log(name);
};

export { createNewUser };
