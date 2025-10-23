import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import employeeRoutes from "./src/module/auth/employee.routes.js";
import userRoutes from "./src/module/user/users.routes.js";
import leaveRoutes from "./src/module/leave/leave.routes.js";
import taskRoutes from "./src/module/task/task.routes.js";
import loanRoutes from "./src/module/loan/loan.routes.js";
import movementRoutes from "./src/module/movementLog/movement_log.routes.js";

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

// Task Management Route
app.use("/api/tasks", taskRoutes);

// Loan Managemnent Routes
app.use("/api/loans", loanRoutes);

// Movement Log Management Route
app.use("/api/movement", movementRoutes);

export default app;
