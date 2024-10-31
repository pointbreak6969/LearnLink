import mongoose, { Schema } from "mongoose";

const UserProfileSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    profilePicture: {
      publicId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    contactInfo: {
      phone: {
        type: String,
        trim: true,
      },
      location: {
        type: String,
        trim: true,
      },
      university: {
        type: String,
      },
      college: {
        type: String,
      },
    },
    liveLocation: {
      type: String,
    },
    uploadedResources: [
      {
        type: Schema.Types.ObjectId,
        ref: "Resource",
      },
    ],
    savedResources: [
      {
        type: Schema.Types.ObjectId,
        ref: "Resource",
      },
    ],
    pointsEarned: {
      type: Number,
      default: 0,
    },
    createdClassroom: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Classroom",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);

export default UserProfile;
