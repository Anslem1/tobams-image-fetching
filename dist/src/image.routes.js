"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cloudinary_upload_1 = require("./cloudinary.upload");
const errorHandler_1 = require("./errorHandler");
const images_controllers_1 = require("./images.controllers");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
// Route to get images
router.get("/get_image", images_controllers_1.getImages);
// Route to handle image upload
router
    .route("/upload")
    .get((req, res) => {
    // Render the "upload" EJS file for GET requests
    res.render("upload");
})
    .post((req, res, next) => {
    // Use a middleware to handle the file upload
    cloudinary_upload_1.upload.single("image")(req, res, function (error) {
        if (error instanceof multer_1.default.MulterError) {
            // Handle Multer errors (e.g., file size exceeds limit)
            return res.status(400).json({ error: error.message });
        }
        else if (error) {
            // Handle other errors (e.g., custom error from fileFilter)
            if (error instanceof errorHandler_1.CustomError) {
                return res
                    .status(error.status)
                    .json({ error: error.message });
            }
            else {
                return res
                    .status(500)
                    .json({ error: "Internal server error" });
            }
        }
        // If no error, proceed to the next middleware (uploadImage controller)
        next();
    });
}, images_controllers_1.uploadImage);
exports.default = router;
