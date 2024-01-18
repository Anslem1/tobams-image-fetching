import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import ejs from "ejs";
import path from "path";
import imageRoutes from "./src/image.routes";
import { CustomError } from "./src/errorHandler";
import { NextFunction, Request, Response } from "express";

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



app.use(cors())
     .use(express.json())
     .set("view engine", "ejs")
     .set("views", path.join(__dirname, "src", "views"))
     .use("/", imageRoutes)
     .listen(process.env.PORT, () => {
          console.log(`Server running on port ${process.env.PORT}`);
     });
