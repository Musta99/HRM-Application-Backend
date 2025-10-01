import pkg from "../../generated/prisma/index.js"; // or "@prisma/client" if you're using default output
const { PrismaClient } = pkg;

const globalForPrisma = globalThis;

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // optional: logs all DB queries for debugging
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
