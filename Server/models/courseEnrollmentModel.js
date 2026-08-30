import mongoose, { Schema } from "mongoose";

const CourseEnrollmentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    courseId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    courseTitle: {
      type: String,
      required: true,
    },
    pricePaid: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "USD",
    },
    paymentMethod: {
      type: String,
      default: "Card",
    },
    transactionId: {
      type: String,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completedLectures: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["active", "completed", "refunded"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate enrollment for the same user and course
CourseEnrollmentSchema.index({ user: 1, courseId: 1 }, { unique: true });

const CourseEnrollment = mongoose.model(
  "CourseEnrollment",
  CourseEnrollmentSchema
);

export default CourseEnrollment;
