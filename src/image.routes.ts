import app from "express";
import { cloudinary, upload } from "./cloudinary.upload";
import { getImages, uploadImage } from "./images.controllers";

const router = app.Router();

router.get("/get_images", getImages);

router
     .route("/upload")
     .get((req, res) => {
          // Render the "upload" EJS file for GET requests
          res.render("upload");
     })
     .post(upload.single("image"), uploadImage);

export default router;
