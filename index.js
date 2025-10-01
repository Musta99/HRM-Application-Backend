// import { createNewUser } from "./src/module/auth/employee.auth.js";

// createNewUser();

import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
