import mongoose from "mongoose";

const plantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide the plant name"],
        },
        description: {
            type: String,
            required: [true, "Please provide a description"],
        },
        price: {
            type: Number,
            required: [true, "Please provide the price"],
        },
        imageUrl: {
            type: String,
            required: [true, "Please provide an image URL"],
        },
        category: {
            type: String,
            required: [true, "Please provide a category"],
        },
        inStock: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Plant = mongoose.models.Plant || mongoose.model("Plant", plantSchema);

export default Plant;
