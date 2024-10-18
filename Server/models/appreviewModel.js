import mongoose, { Schema } from "mongoose";

const AppReviewSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        trim: true,
        required: [true, 'Review message is required']
    },
    userprofile: {
        type: mongoose.Types.ObjectId,
        ref: 'UserProfile',
        required: true
    }
}, {
    timestamps: true
});

const AppReview = mongoose.model("AppReview", AppReviewSchema);

export default AppReview;
