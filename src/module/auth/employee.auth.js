import prisma from "../../prisma-client/prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// SignUp user
const signUpUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: "Name and password are required" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role,
      },
    });

    return res
      .status(201)
      .json({ message: "User created successfully", userId: newUser.id });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: "There is no account related to this email" });
    }

    // Here you would typically compare the hashed passwords
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Passwords do not matched" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "User Logged in suceesfully",
      data: { token, userId: user.id, role: user.role },
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// const createNewUser = async (req, res) => {
//   const { name, email, phone, address, role, department, reportingBoss } =
//     req.body;

//           if (!name || !email || !phone || !address || !role || !department) {
//               return res.status(400).json({ error: "All fields are required" });
//           }
//     const newUser =  await prisma.user.create({
//       data: {
//         name,
//         email,
//         phone,
//         address,
//         role,
//         department,
//         reportingBoss: null,
//       },
//     });

//   console.log(name);
// };

export { signUpUser, loginUser };
