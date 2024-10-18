import mongoose, { Schema } from "mongoose";

const ResourceSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Resource title is required'],
        trim: true
    },
    pictures: {
        type: String,
        trim: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        trim: true
    },
    link: {
        type: String,
        trim: true
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Resource = mongoose.model("Resource", ResourceSchema);

export default Resource;
