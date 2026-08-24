import mongoose, { Schema } from "mongoose";

const ClassroomSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Classroom name is required"],
    },
    admin: {
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
    university: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    resources: [
      {
        type: Schema.Types.ObjectId,
        ref: "Resource",
      },
    ],
    code: {
      type: String,
      required: [true, "Code is required"],
      unique: true,
    },
    requestedUsers: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User"
        },
        status: {
          type: Boolean,
          default: false
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
  },
  {
    timestamps: true,
  }
);

const Classroom = mongoose.model("Classroom", ClassroomSchema);

export default Classroom;