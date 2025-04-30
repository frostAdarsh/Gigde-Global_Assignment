import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import projectRouter from "./routes/project.route.js";

import connectDB from "./lib/bd.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);


app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
