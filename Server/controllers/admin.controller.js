import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/userModel.js";
import UserProfile from "../models/user_profileModel.js";
import Classroom from "../models/classroomModel.js";
import Resource from "../models/resourceModel.js";
import mongoose from "mongoose";

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Get platform-wide overview statistics
 */
export const getPlatformStats = asyncHandler(async (req, res) => {
  const [totalUsers, totalClassrooms, totalResources, pendingRequestsCount] =
    await Promise.all([
      User.countDocuments(),
      Classroom.countDocuments(),
      Resource.countDocuments(),
      Classroom.aggregate([
        { $unwind: "$requestedUsers" },
        { $match: { "requestedUsers.status": false } },
        { $count: "count" },
      ]),
    ]);

  const stats = {
    totalUsers,
    totalClassrooms,
    totalResources,
    pendingRequests: pendingRequestsCount[0]?.count || 0,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, stats, "Platform statistics retrieved successfully"));
});

/**
 * Get all users with search, university filter, and pagination
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = "", university = "All", role = "All" } = req.query;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;
  const skip = (pageNum - 1) * limitNum;

  const matchConditions = {};

  if (search.trim()) {
    const searchRegex = new RegExp(escapeRegex(search.trim()), "i");
    matchConditions.$or = [
      { fullName: searchRegex },
      { email: searchRegex },
    ];
  }

  if (role !== "All" && (role === "user" || role === "superadmin")) {
    matchConditions.role = role;
  }

  const pipeline = [
    { $match: matchConditions },
    {
      $lookup: {
        from: "userprofiles",
        localField: "_id",
        foreignField: "user",
        as: "profile",
      },
    },
    {
      $addFields: {
        profile: { $arrayElemAt: ["$profile", 0] },
      },
    },
  ];

  if (university !== "All" && university.trim()) {
    pipeline.push({
      $match: {
        "profile.contactInfo.university": university.trim(),
      },
    });
  }

  const countPipeline = [...pipeline, { $count: "total" }];
  const countResult = await User.aggregate(countPipeline);
  const totalUsers = countResult[0]?.total || 0;

  pipeline.push(
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limitNum },
    {
      $project: {
        _id: 1,
        fullName: 1,
        email: 1,
        role: 1,
        createdAt: 1,
        "profile.contactInfo": 1,
        "profile.profilePicture": 1,
        "profile.pointsEarned": 1,
      },
    }
  );

  const users = await User.aggregate(pipeline);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        users,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limitNum) || 1,
        currentPage: pageNum,
      },
      "Users fetched successfully"
    )
  );
});

/**
 * Get detailed profile and activity of a single user
 */
export const getUserDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const user = await User.findById(id).select("-password -refreshToken -otp -otpExpiry");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const [profile, createdClassrooms, enrolledClassrooms, uploadedResources] =
    await Promise.all([
      UserProfile.findOne({ user: id }),
      Classroom.find({ admin: id }).select("name code university faculty createdAt"),
      Classroom.find({ users: id }).select("name code university faculty createdAt"),
      Resource.find({ owner: id }).select("title text createdAt resource"),
    ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
        profile,
        createdClassrooms,
        enrolledClassrooms,
        uploadedResources,
      },
      "User details fetched successfully"
    )
  );
});

/**
 * Update a user's role (promote/demote between user and superadmin)
 */
export const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid user ID");
  }

  if (!["user", "superadmin"].includes(role)) {
    throw new ApiError(400, "Invalid role. Must be 'user' or 'superadmin'");
  }

  if (req.user._id.toString() === id && role !== "superadmin") {
    throw new ApiError(400, "You cannot demote your own superadmin account");
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: { role } },
    { new: true }
  ).select("-password -refreshToken -otp -otpExpiry");

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, `User role updated to ${role} successfully`));
});

/**
 * Delete a user and clean up related data
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid user ID");
  }

  if (req.user._id.toString() === id) {
    throw new ApiError(400, "You cannot delete your own account from the admin panel");
  }

  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Clean up user profile
  await UserProfile.findOneAndDelete({ user: id });

  // Remove user from all classroom members and co-admins
  await Classroom.updateMany(
    {},
    {
      $pull: {
        users: id,
        admins: id,
        requestedUsers: { user: id },
      },
    }
  );

  // Delete user document
  await User.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User deleted successfully"));
});

/**
 * Get all classrooms with extended stats for Admin
 */
export const getAllClassroomsAdmin = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = "", university = "All", faculty = "All" } = req.query;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;
  const skip = (pageNum - 1) * limitNum;

  const matchConditions = {};

  if (search.trim()) {
    const searchRegex = new RegExp(escapeRegex(search.trim()), "i");
    matchConditions.$or = [
      { name: searchRegex },
      { university: searchRegex },
      { faculty: searchRegex },
      { code: searchRegex },
    ];
  }

  if (university !== "All" && university.trim()) {
    matchConditions.university = new RegExp(`^${escapeRegex(university.trim())}$`, "i");
  }

  if (faculty !== "All" && faculty.trim()) {
    matchConditions.faculty = new RegExp(`^${escapeRegex(faculty.trim())}$`, "i");
  }

  const pipeline = [
    { $match: matchConditions },
    {
      $lookup: {
        from: "users",
        localField: "admin",
        foreignField: "_id",
        as: "creator",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "admins",
        foreignField: "_id",
        as: "coAdmins",
      },
    },
    {
      $addFields: {
        creator: { $arrayElemAt: ["$creator", 0] },
        totalUsers: { $size: { $ifNull: ["$users", []] } },
        totalResources: { $size: { $ifNull: ["$resources", []] } },
        totalPendingRequests: { $size: { $ifNull: ["$requestedUsers", []] } },
      },
    },
  ];

  const countPipeline = [...pipeline, { $count: "total" }];
  const countResult = await Classroom.aggregate(countPipeline);
  const totalClassrooms = countResult[0]?.total || 0;

  pipeline.push(
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limitNum },
    {
      $project: {
        _id: 1,
        name: 1,
        university: 1,
        faculty: 1,
        code: 1,
        createdAt: 1,
        totalUsers: 1,
        totalResources: 1,
        totalPendingRequests: 1,
        "creator._id": 1,
        "creator.fullName": 1,
        "creator.email": 1,
        "coAdmins._id": 1,
        "coAdmins.fullName": 1,
        "coAdmins.email": 1,
      },
    }
  );

  const classrooms = await Classroom.aggregate(pipeline);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        classrooms,
        totalClassrooms,
        totalPages: Math.ceil(totalClassrooms / limitNum) || 1,
        currentPage: pageNum,
      },
      "Classrooms fetched successfully"
    )
  );
});

/**
 * Super Admin edit any classroom
 */
export const updateClassroomAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, university, faculty } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid classroom ID");
  }

  const updateData = {};
  if (name?.trim()) updateData.name = name.trim();
  if (university?.trim()) updateData.university = university.trim();
  if (faculty?.trim()) updateData.faculty = faculty.trim();

  const updatedClassroom = await Classroom.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  ).populate("admin", "fullName email");

  if (!updatedClassroom) {
    throw new ApiError(404, "Classroom not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedClassroom, "Classroom updated successfully"));
});

/**
 * Super Admin delete any classroom
 */
export const deleteClassroomAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid classroom ID");
  }

  const classroom = await Classroom.findById(id);
  if (!classroom) {
    throw new ApiError(404, "Classroom not found");
  }

  // Delete associated resources
  await Resource.deleteMany({ classroom: id });

  // Delete classroom
  await Classroom.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Classroom deleted successfully"));
});

/**
 * Get all pending student requests across all classrooms in the platform
 */
export const getAllPendingRequests = asyncHandler(async (req, res) => {
  const pendingRequests = await Classroom.aggregate([
    { $unwind: "$requestedUsers" },
    {
      $lookup: {
        from: "users",
        localField: "requestedUsers.user",
        foreignField: "_id",
        as: "student",
      },
    },
    { $unwind: "$student" },
    {
      $lookup: {
        from: "userprofiles",
        localField: "student._id",
        foreignField: "user",
        as: "studentProfile",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "admin",
        foreignField: "_id",
        as: "owner",
      },
    },
    { $unwind: "$owner" },
    {
      $project: {
        classroomId: "$_id",
        classroomName: "$name",
        classroomCode: "$code",
        university: "$university",
        faculty: "$faculty",
        ownerName: "$owner.fullName",
        studentId: "$student._id",
        studentName: "$student.fullName",
        studentEmail: "$student.email",
        studentProfilePicture: {
          $arrayElemAt: ["$studentProfile.profilePicture.url", 0],
        },
        requestedAt: "$requestedUsers.createdAt",
      },
    },
    { $sort: { requestedAt: -1 } },
  ]);

  return res.status(200).json(
    new ApiResponse(200, pendingRequests, "All pending requests fetched successfully")
  );
});

/**
 * Super Admin accept or reject any student join request for any classroom
 */
export const handlePendingRequest = asyncHandler(async (req, res) => {
  const { classroomId, userId, status } = req.body;

  if (!classroomId || !mongoose.Types.ObjectId.isValid(classroomId)) {
    throw new ApiError(400, "Valid classroom ID is required");
  }
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Valid user ID is required");
  }
  if (!["accept", "reject"].includes(status)) {
    throw new ApiError(400, "Status must be 'accept' or 'reject'");
  }

  const classroom = await Classroom.findById(classroomId);
  if (!classroom) {
    throw new ApiError(404, "Classroom not found");
  }

  const requestIndex = classroom.requestedUsers.findIndex(
    (reqUser) => reqUser.user?.toString() === userId.toString()
  );

  if (requestIndex === -1) {
    throw new ApiError(400, "Pending request not found for this user in the specified classroom");
  }

  classroom.requestedUsers.splice(requestIndex, 1);

  if (status === "accept") {
    if (!classroom.users.some((u) => u.toString() === userId.toString())) {
      classroom.users.push(userId);
    }
  }

  await classroom.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      classroom,
      status === "accept" ? "Student approved into classroom" : "Request rejected"
    )
  );
});
