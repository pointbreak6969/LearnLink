import mongoose, { Schema } from "mongoose";

const CanvasSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    objects: [
      {
        type: Object,
        required: true,
      },
    ],
    viewportTransform: {
      type: [Number],
      default: [1, 0, 0, 1, 0, 0],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    collabrators: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    lastModified: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
const Canvas = mongoose.model("Canvas", CanvasSchema)
export default Canvas;