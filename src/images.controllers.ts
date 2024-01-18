import { Request, Response } from "express";
import Image from "./image.model";
import { CustomError } from "./errorHandler";

export const uploadImage = async (req: Request, res: Response) => {
     try {
          if (!req.file) {
               return res.status(400).json({
                    error: "Input cannot be empty. Please select an image",
               });
          }
          // Save image details to MongoDB
          await new Image({ image: req.file.path }).save();
          // Send JSON response after rendering
          res.status(201).json({ message: "Image uploaded successfully" });
     } catch (error: any) {
          res.status(400).json({ error: error.message || "Invalid request" });
     }
};

export const getImages = async (req: Request, res: Response) => {
     try {
          // Fetch images from MongoDB
          const images = await Image.find();
          // Render the "images" template with the fetched images
          res.render("images", { images });

     } catch (error) {
          console.error("Error fetching images:", error);

          // Handle different types of errors
          if (error instanceof Error) {
               res.status(500).json({ error: error.message });
          } else {
               res.status(500).json({ error: "Internal server error" });
          }
     }
};
