import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Classroom from "../models/classroomModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import generateRandomString from "../utils/randomString.js";
import mongoose from "mongoose";
const createClassroom = asyncHandler(async (req, res) => {
  const { classroomName } = req.body;
  if (!classroomName) {
    throw new ApiError(400, "Classroom Name is required");
  }
  const { universityName, facultyName } = req.body || req.params;
  if (!(universityName && facultyName)) {
    throw new ApiError(400, "All fields are required");
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
    university: universityName,
    faculty: facultyName,
    users: [admin],
    code: classroomCode,
  });
  if (!response) {
    throw new ApiError(500, "Error while creating classroom");
  }
  return res
    .status(200)
    .json(new ApiResponse(201, response, "Classroom created successfully"));
});
const deleteClassroom = asyncHandler(async (req, res) => {
  const { classroomId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(classroomId)) {
    throw new ApiError(400, "Invalid Classroom ID");
  }
  const classroom = await Classroom.findById(classroomId);
  if (!classroom) {
    throw new ApiError(400, "Classroom not found");
  }
  if (classroom.admin.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized: Only the classroom admin can delete this classroom");
  }
  await Classroom.findByIdAndDelete(classroomId);
  return res
    .status(200)
    .json(new ApiResponse(201, {}, "classroom deleted successfully"));
});

const updateClassroom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { newClassroomName, newFacultyName, newUniversityName } = req.body;

  // Validate input
  if (!id) {
    throw new ApiError(400, "Classroom ID is required");
  }

  // Find classroom and check if it exists
  const classroom = await Classroom.findById(id);
  if (!classroom) {
    throw new ApiError(404, "Classroom not found");
  }

  // Check authorization
  if (classroom.admin.toString() !== req.user._id.toString()) {
    throw new ApiError(
      403,
      "Unauthorized: Only the author can update this classroom"
    );
  }

  // Prepare update data
  const updateData = {};
  if (newClassroomName && newClassroomName.trim() !== "") {
    updateData.name = newClassroomName.trim();
  }

  if (newUniversityName && newUniversityName.trim() !== "") {
    updateData.university = newUniversityName.trim();
  }

  if (newFacultyName && newFacultyName.trim() !== "") {
    updateData.faculty = newFacultyName.trim();
  }

  // Update classroom with new data
  const updatedClassroom = await Classroom.findByIdAndUpdate(
    id,
    {
      $set: updateData,
    },
    {
      new: true, // Return the updated document
      runValidators: true, // Run model validators
    }
  );

  if (!updatedClassroom) {
    throw new ApiError(500, "Failed to update classroom");
  }

  // Return success response
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedClassroom, "Classroom updated successfully")
    );
});
const getAllClassrooms = asyncHandler(async (req, res) => {
  const allClasses = await Classroom.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "admin",
        foreignField: "_id",
        as: "admin_details",
      },
    },
    {
      $addFields: {
        admin_details: {
          $first: "$admin_details",
        },
      },
    },
    {
      $project: {
        "admin_details.fullName": 1,
        name: 1,
        university: 1,
        faculty: 1,
        users: 1,
        resources: 1,
      },
    },
  ]);
  if (!allClasses) {
    throw new ApiError(500, "Server Error");
  }
  return res.status(200).json(new ApiResponse(200, allClasses, "Success"));
});
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getClassroomByUniversityAndFaculty = asyncHandler(async (req, res) => {
  const { universityName, facultyName } = req.query;
  if (!universityName && !facultyName) {
    throw new ApiError(
      400,
      "At least one filter (university or faculty) is required"
    );
  }
  if (
    (universityName && typeof universityName !== "string") ||
    (facultyName && typeof facultyName !== "string")
  ) {
    throw new ApiError(400, "Invalid filter value");
  }
  if (
    (universityName && universityName.length > 100) ||
    (facultyName && facultyName.length > 100)
  ) {
    throw new ApiError(400, "Filter value too long");
  }
  const matchConditions = [];

  if (universityName) {
    matchConditions.push({
      $match: {
        university: new RegExp(escapeRegex(universityName), "i"),
      },
    });
  }

  if (facultyName) {
    matchConditions.push({
      $match: {
        faculty: new RegExp(escapeRegex(facultyName), "i"),
      },
    });
  }

  const response = await Classroom.aggregate(matchConditions);

  if (!response || response.length === 0) {
    throw new ApiError(404, "No classrooms found matching the criteria");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, response, "Fetched successfully"));
});
const getClassroomDetails = asyncHandler(async (req, res) => {
  const { classroomId } = req.params;
  if (!classroomId) {
    throw new ApiError(400, "classroom id not found");
  }
  if (!mongoose.Types.ObjectId.isValid(classroomId)) {
    throw new ApiError(400, "Invalid Classroom ID");
  }
  const classroom = await Classroom.findById(classroomId);
  if (!classroom) {
    throw new ApiError(404, "Classroom not found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, classroom, "Classroom details found successfully")
    );
});
const joinClassroom = asyncHandler(async (req, res) => {
  const { code } = { ...req.body, ...req.params };
  if (!code || typeof code !== "string") {
    throw new ApiError(400, "A valid classroom code is required");
  }

  const userId = req.user._id;
  const classroom = await Classroom.findOne({ code });
  if (!classroom) {
    throw new ApiError(400, "Not a valid classroom code");
  }
  if (classroom.users.includes(userId)) {
    throw new ApiError(400, "You are already in Classroom");
  }
  classroom.users.push(userId);
  await classroom.save();
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { id: classroom._id },
        "Classroom joined successfully"
      )
    );
});
const getSuggestedClassrooms = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    let suggestedClassrooms;
    let total;

    if (req.user) {
      suggestedClassrooms = await Classroom.find({
        $nor: [
          { users: req.user._id },
          { 'requestedUsers.user': req.user._id }
        ]
      })
      .populate({
        path: 'admin',
        model: 'User',
        select: 'fullName -_id'
      })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

      total = await Classroom.countDocuments({
        $nor: [
          { users: req.user._id },
          { 'requestedUsers.user': req.user._id }
        ]
      });

    } else {
      suggestedClassrooms = [];
      total = 0;
    }

    return res.status(200).json(
      new ApiResponse(200, {
        classrooms: suggestedClassrooms,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        hasMore: page * limit < total,
      }, "Classrooms fetched successfully")
    );
  } catch (error) {
    console.error('Error in getSuggestedClassrooms:', error);
    return res.status(500).json({ message: error.message });
  }
});
const getClassroomUsers = asyncHandler(async (req, res)=>{
  const {classroomId} = req.params;
  if(!classroomId || !mongoose.Types.ObjectId.isValid(classroomId)){
    throw new ApiError(400, "Valid classroom Id is required");
  }
  const membershipCheck = await Classroom.findById(classroomId).select("admin users");
  if (!membershipCheck) {
    throw new ApiError(404, "Classroom not found");
  }
  const requesterId = req.user._id.toString();
  const isMember =
    membershipCheck.admin.toString() === requesterId ||
    membershipCheck.users.some((u) => u.toString() === requesterId);
  if (!isMember) {
    throw new ApiError(403, "You are not a member of this classroom");
  }
  const response = await Classroom.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(classroomId)
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "admin",
        foreignField: "_id",
        as: "adminDetails"
      }
    },
    {
      $set: {
        "adminDetails": { $arrayElemAt: ["$adminDetails", 0] }
      }
    },
    {
      $lookup: {
        from: "userprofiles",
        localField: "admin",  // Using admin directly since it's the user ID
        foreignField: "user", // Matching with the user field in userprofiles
        as: "adminProfileDetails"
      }
    },
    {
      $set: {
        "adminProfileDetails": { $arrayElemAt: ["$adminProfileDetails", 0] }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "users",
        foreignField: "_id",
        as: "results"
      }
    },
    {
      $unwind: "$results"
    },
    {
      $lookup: {
        from: "userprofiles",
        localField: "results._id",
        foreignField: "user",
        as: "results.profileDetails"
      }
    },
    {
      $set: {
        "results.profileDetails": { $arrayElemAt: ["$results.profileDetails", 0] }
      }
    },
    {
      $group: {
        _id: "$_id",
        admin: {
          $first: {
            fullName: "$adminDetails.fullName",
            profileDetails: {
              profilePicture: "$adminProfileDetails.profilePicture"
            }
          }
        },
        results: {
          $push: {
            _id: "$results._id",
            fullName: "$results.fullName",
            profileDetails: {
              profilePicture: "$results.profileDetails.profilePicture"
            }
          }
        }
      }
    },
    {
      $project: {
        admin: 1,
        results: 1
      }
    }
  ])
  if (!response) {
    throw new ApiError(500, "Server Error");
  }
  return res.status(200).json(new ApiResponse(200, response, "Success"));
})


const requestToJoinclassRoom=asyncHandler(async(req,res)=>{
  const {id}=req.body
  if(!id || !mongoose.Types.ObjectId.isValid(id)){
    throw new ApiError(400,"Valid classroom id is required")
  }
  const classroom=await Classroom.findById(id)
  if(!classroom){
    throw new ApiError(400,"no classroom found")
  }
  const requesterId = req.user._id.toString();
  const alreadyMember = classroom.users.some((u) => u.toString() === requesterId);
  if (alreadyMember) {
    throw new ApiError(400, "You are already in this classroom");
  }
  const userExists = classroom.requestedUsers.find(request => request.user.toString()===requesterId);
  if(userExists){
    throw new ApiError(401,"You already requested to join classroom")
  }
  classroom.requestedUsers.push({ user: req.user._id })
  await classroom.save()
  return res.status(200).json
  (
    new ApiResponse(200,classroom,"requested to join into classroom")
  )
})


const getJoinRequests = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Valid classroom ID is required");
  }

  const classroom = await Classroom.findById(id).select("admin");
  if (!classroom) {
    throw new ApiError(404, "Classroom not found");
  }
  if (classroom.admin.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only the classroom admin can view join requests");
  }

  const joinRequests = await Classroom.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) }
    },
    {
      $unwind: "$requestedUsers"
    },
    {
      $lookup: {
        from: "users",
        localField: "requestedUsers.user",
        foreignField: "_id",
        as: "userDetails"
      }
    },
    {$unwind:"$userDetails"},
    {
      $project: {
        _id:"$userDetails._id",
        fullName:"$userDetails.fullName"
      }
    },

  ]);
  return res.status(200).json(
    new ApiResponse(200, joinRequests, "Join requests fetched successfully")
  );
});

const userRequestToadmin=asyncHandler(async(req,res)=>{
  const {id,status,userId}=req.body
  if(!id || !mongoose.Types.ObjectId.isValid(id)){
    throw new ApiError(400,"Valid classroom id is required")
  }
  if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
    throw new ApiError(400,"Valid user id is required")
  }
  if(status !== "accept" && status !== "reject"){
    throw new ApiError(400,"Status must be 'accept' or 'reject'")
  }
  const classroom=await Classroom.findById(id)
  if(!classroom){
    throw new ApiError(400,"No classroom found")
  }
  if(classroom.admin.toString() !== req.user._id.toString()){
    throw new ApiError(403,"Only the classroom admin can manage join requests")
  }
  const requestIndex = classroom.requestedUsers.findIndex(
    request => request.user.toString() === userId
  );

  if (requestIndex === -1) {
    throw new ApiError(400, "User request not found")
  }

  classroom.requestedUsers.splice(requestIndex, 1)

  if (status === "accept") {
    classroom.users.push(userId)
  }

  await classroom.save()
  return res.status(200).json(
    new ApiResponse(
      200,
      classroom,
      status === "accept" ? "User joined the classroom" : "Request rejected",
    )
  )
})


export {
  createClassroom,
  deleteClassroom,
  updateClassroom,
  getAllClassrooms,
  getClassroomByUniversityAndFaculty,
  joinClassroom,
  getClassroomDetails,
  getSuggestedClassrooms,
  getClassroomUsers,
  requestToJoinclassRoom,
  userRequestToadmin,
  getJoinRequests
};
