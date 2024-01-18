import mongoose, { Schema } from "mongoose";

const imagesSchema = new Schema({
     image: { type: String, required: true },
});

export default mongoose.model("Image", imagesSchema);
