import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import ejs from "ejs";
import path from "path";
import imageRoutes from "./src/image.routes";
import { CustomError, errorHandler } from "./src/errorHandler";

dotenv.config();

const app = express();
const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
     console.error(
          "MongoDB connection URL not found in environment variables."
     );
     process.exit(1);
}

mongoose
     .connect(mongoUrl)
     .then(() => {
          console.log("MongoDB connected successfully");
     })
     .catch((error) => {
          console.error("MongoDB connection error:", error);
          process.exit(1);
     });

app.get("/", (req, res) => {
     res.render("home");
});

app.use(cors());
app.use(express.json());
app.use(errorHandler); // Global error handler middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
app.use("/", imageRoutes);

// Catch 404 errors and forward them to the error handler
app.use((req, res, next) => {
     const error = new CustomError(404, "Not Found");
     next(error);
});

app.listen(process.env.PORT, () => {
     console.log(`Server running on port ${process.env.PORT}`);
});
