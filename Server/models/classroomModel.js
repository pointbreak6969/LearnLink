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
        ref: "users",
      },
    ],
    resources: [
      {
        type: Schema.Types.ObjectId,
        ref: "resources",
      },
    ],
    code: {
      type: String,
      required: [true, "Code is required"],
      unique: true,
    },
    requestedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
        type: Schema.Types.ObjectId,
        ref: "join",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const joinSchema = new Schema({
  join: Boolean,
  default: false,
});
export const Join = mongoose.model("join", joinSchema);
const Classroom = mongoose.model("Classroom", ClassroomSchema);

export default Classroom;
