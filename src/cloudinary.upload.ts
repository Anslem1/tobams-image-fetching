import cloudinary from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import { CustomError } from "./errorHandler";
dotenv.config();

// Initialize Cloudinary
const cloudinaryConfig = cloudinary.v2;

// Configure Cloudinary with your credentials
cloudinaryConfig.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_KEY,
     api_secret: process.env.CLOUDINARY_SECRET,
});

// Create CloudinaryStorage instance for multer
const multerStorageEngine = new CloudinaryStorage({
     cloudinary: cloudinaryConfig,
});

const upload = multer({
     storage: multerStorageEngine,
     fileFilter: (req, file, callback) => {
          // Check if the file is an image (modify the allowedTypes array as needed)
          const allowedTypes = [
               "image/jpeg",
               "image/jpg",
               "image/png",
               "image/gif",
               "image/tiff",
               "image/bmp",
               "image/webp",
               "image/heif",
          ];
          if (!allowedTypes.includes(file.mimetype)) {
               const error = new Error(
                    "Invalid file format. Only JPEG, JPG, PNG, GIF TIFF, BMP, WEBP, and HEIF images are allowed."
               );
               callback(error.message);
          }
          callback(null, true);
     },
});

export { cloudinary, upload };
