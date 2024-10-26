import mongoose, { Schema } from "mongoose";

const UserProfileSchema = new Schema({
    profilePicture: {
        type: String,
        required: [true, 'Profile picture is required'],
        trim: true
    },
    contactInfo: {
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
            trim: true
        },
        university:{
            type: String,
        },
        college:{
            type:String
        }
    },
    uploadedResources: [{
        type: Schema.Types.ObjectId,
        ref: 'Resource'
    }],
    savedResources: [{
        type: Schema.Types.ObjectId,
        ref: 'Resource'
    }],
    pointsEarned: {
        type: Number,
        default: 0
    },
    createdClassroom:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Classroom'
        }
    ]
}, {
    timestamps: true
});

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);

export default UserProfile;
