"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const image_routes_1 = __importDefault(require("./src/image.routes"));
const errorHandler_1 = require("./src/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
    console.error("MongoDB connection URL not found in environment variables.");
    process.exit(1);
}
mongoose_1.default
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
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(errorHandler_1.errorHandler); // Global error handler middleware
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "src", "views"));
app.use("/", image_routes_1.default);
// Catch 404 errors and forward them to the error handler
app.use((req, res, next) => {
    const error = new errorHandler_1.CustomError(404, "Not Found");
    next(error);
});
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
