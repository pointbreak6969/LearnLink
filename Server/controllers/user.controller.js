import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/userModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!(fullName && email && password)) {
    throw new ApiError(400, "Please provide all required fields: full name, email, and password");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }
  const user = await User.create({ fullName, email, password });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -otp -otpExpiry"
  );
  if (!createdUser) {
    throw new ApiError(500, "User not created");
  }
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(201, {createdUser:{
      _id: createdUser._id,
      fullName: createdUser.fullName,
      email: createdUser.email
    }}, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    throw new ApiError(400, "Email and password are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid credentials");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -otp -otpExpiry"
  );
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, {
      loggedInUser: {
        _id: loggedInUser._id,
        fullName: loggedInUser.fullName,
        email: loggedInUser.email
      }
    }, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User found successfully"));
});
const getUserAllClassrooms = asyncHandler(async (req, res) => {
  const userClassrooms = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user?._id),
      },
    },
    {
      $lookup: {
        from: "classrooms",
        localField: "_id",
        foreignField: "users",
        as: "results",
      },
    },
    {
      $unwind: "$results",
    },
    {
      $lookup: {
        from: "users",
        localField: "results.admin",
        foreignField: "_id",
        as: "results.admin",
      },
    },
    {
      $unwind: "$results.admin",
    },
    {
      $project: {
        "results._id": 1,
        "results.name": 1,
        "results.university": 1,
        "results.faculty": 1,
        "results.users": 1,
        "results.resources": 1,
        "results.code": 1,
        "results.createdAt": 1,
        "results.updatedAt": 1,
        "results.__v": 1,
        "results.admin.fullName": 1, // Only keeping fullName from admin details
      },
    },
    {
      $group: {
        _id: "$_id",
        results: { $push: "$results" },
      },
    },
  ]);
  return res
    .status(200)
    .json(
      new ApiResponse(200, userClassrooms, "User classrooms found successfully")
    );
});
export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getUserAllClassrooms,
};
