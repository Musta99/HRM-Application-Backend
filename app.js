import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import employeeRoutes from "./src/module/auth/employee.routes.js";
import userRoutes from "./src/module/user/users.routes.js";
import leaveRoutes from "./src/module/leave/leave.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set

// Middleware
app.use(cors());
app.use(express.json());

// Route Declaration
app.use("/api/employees", employeeRoutes);

// User Routes
app.use("/api/users", userRoutes);

// Leave Request Routes
app.use("/api/leaves", leaveRoutes);

export default app;
