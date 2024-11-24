import mongoose, { Schema } from "mongoose";

const ResourceSchema = new Schema(
  {
    resource: [
      {
        type: String,
        trim: true,
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
    text: {
      type: String,
      trim: true,
    },
    classroom: {
      type: mongoose.Types.ObjectId,
      ref: "Classroom",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model("Resource", ResourceSchema);

export default Resource;
