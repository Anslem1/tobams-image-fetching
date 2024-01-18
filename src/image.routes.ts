import express from "express";
import { upload } from "./cloudinary.upload";
import { CustomError } from "./errorHandler";
import { getImages, uploadImage } from "./images.controllers";
import multer from "multer";

const router = express.Router();

// Route to get images
router.get("/get_image", getImages);

// Route to handle image upload
router
     .route("/upload")
     .get((req, res) => {
          // Render the "upload" EJS file for GET requests
          res.render("upload");
     })
     .post((req, res, next) => {
          // Use a middleware to handle the file upload
          upload.single("image")(req, res, function (error) {
               if (error instanceof multer.MulterError) {
                    // Handle Multer errors (e.g., file size exceeds limit)
                    return res.status(400).json({ error: error.message });
               } else if (error) {
                    // Handle other errors (e.g., custom error from fileFilter)
                    if (error instanceof CustomError) {
                         return res
                              .status(error.status)
                              .json({ error: error.message });
                    } else {
                         return res
                              .status(500)
                              .json({ error: "Internal server error" });
                    }
               }

               // If no error, proceed to the next middleware (uploadImage controller)
               next();
          });
     }, uploadImage);

export default router;
