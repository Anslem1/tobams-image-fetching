"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.cloudinary = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
exports.cloudinary = cloudinary_1.default;
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = require("./errorHandler");
dotenv_1.default.config();
// Initialize Cloudinary
const cloudinaryConfig = cloudinary_1.default.v2;
// Configure Cloudinary with your credentials
cloudinaryConfig.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
// Create CloudinaryStorage instance for multer
const multerStorageEngine = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinaryConfig,
});
const upload = (0, multer_1.default)({
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
            const error = new errorHandler_1.CustomError("Invalid file format. Only JPEG, JPG, PNG, GIF TIFF, BMP, WEBP, and HEIF images are allowed.");
            callback(error.toJSON().message);
        }
        callback(null, true);
    },
});
exports.upload = upload;
