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
    admins: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    text: {
      type: String,
      trim: true,
    },
    classroom: {
      type: mongoose.Types.ObjectId,
      ref: "Classroom",
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
