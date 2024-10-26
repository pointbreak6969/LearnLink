import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Classroom from "../models/classroomModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import generateRandomString from "../utils/randomString.js";
const createClassroom = asyncHandler(async (req, res) => {
  const classroomName = req.body;
  if (!classroomName) {
    throw new ApiError(400, "Classroom Name is required");
  }
  const admin = req.user?._id;
  if (!admin) {
    throw new ApiError(401, "Unauthorized");
  }
  const classroomCode = generateRandomString();
  if (!classroomCode) {
    throw new ApiError(500, "Can't create a classroom");
  }
  const response = await Classroom.create({
    name: classroomName,
    admin,
    code,
  });
  if (!response) {
    throw new ApiError(500, "Error while creating classroom");
  }
  return res
    .status(200)
    .json(new ApiResponse(201, response, "Classroom created successfully"));
});
export { createClassroom };
