import mongoose, { Schema } from "mongoose";

const ResourceSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Resource title is required'],
        index:'text',
        trim: true
    },
    resource:[ {
        type: String,
        trim: true
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        trim: true
    },
    classroom:{
        type:mongoose.Types.ObjectId,
        ref:'Classroom'
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
