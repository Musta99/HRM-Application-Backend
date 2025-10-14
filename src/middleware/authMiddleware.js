import prisma from "../prisma-client/prismaClient.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Middleware to authenticate JWT token
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  console.log(authHeader, token);

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("Decoded Token", decoded);

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  console.log(user);

  if (!user) {
    return res.status(401).json({ error: "No user found there" });
  }

  req.user = user; // Attach user info to request object
  next();
};

export { authMiddleware };
