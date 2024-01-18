"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cloudinary_upload_1 = require("./cloudinary.upload");
const images_controllers_1 = require("./images.controllers");
const router = express_1.default.Router();
router.get("/get_images", images_controllers_1.getImages);
router
    .route("/upload")
    .get((req, res) => {
    // Render the "upload" EJS file for GET requests
    res.render("upload");
})
    .post(cloudinary_upload_1.upload.single("image"), images_controllers_1.uploadImage);
exports.default = router;
