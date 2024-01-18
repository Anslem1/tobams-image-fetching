"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImages = exports.uploadImage = void 0;
const image_model_1 = __importDefault(require("./image.model"));
const uploadImage = (err, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: "Input cannot be empty. Please select an image",
            });
        }
        // Save image details to MongoDB
        yield new image_model_1.default({ image: req.file.path }).save();
        // Send JSON response after rendering
        res.status(201).json({ message: "Image uploaded successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error.message || "Invalid request" });
    }
});
exports.uploadImage = uploadImage;
const getImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch images from MongoDB
        const images = yield image_model_1.default.find();
        // Render the "images" template with the fetched images
        res.render("images", { images });
        yield image_model_1.default.deleteMany();
    }
    catch (error) {
        console.error("Error fetching images:", error);
        // Handle different types of errors
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
});
exports.getImages = getImages;
