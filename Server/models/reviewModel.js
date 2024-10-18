import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema({
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: 1,
        max: 5
    },
    reviewmessage: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
