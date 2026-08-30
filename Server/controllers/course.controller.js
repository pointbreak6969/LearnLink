import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import CourseEnrollment from "../models/courseEnrollmentModel.js";

// Purchase / Enroll in a course
const purchaseCourse = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(401, "You must be logged in to purchase a course");
  }

  const { courseId, courseTitle, pricePaid = 0, currency = "USD", paymentMethod = "Card" } = req.body;

  if (!courseId || !courseTitle) {
    throw new ApiError(400, "Course ID and Title are required");
  }

  // Check if already enrolled
  const existingEnrollment = await CourseEnrollment.findOne({
    user: userId,
    courseId,
    status: "active",
  });

  if (existingEnrollment) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          existingEnrollment,
          "You are already enrolled in this course"
        )
      );
  }

  const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const enrollment = await CourseEnrollment.create({
    user: userId,
    courseId,
    courseTitle,
    pricePaid: Number(pricePaid) || 0,
    currency,
    paymentMethod,
    transactionId,
    progress: 0,
    completedLectures: [],
    status: "active",
  });

  if (!enrollment) {
    throw new ApiError(500, "Failed to complete course enrollment");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, enrollment, "Course purchased and enrolled successfully")
    );
});

// Get all enrolled courses for the logged-in user
const getMyEnrolledCourses = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const enrollments = await CourseEnrollment.find({
    user: userId,
    status: "active",
  }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(200, enrollments || [], "Enrolled courses retrieved successfully")
    );
});

// Check enrollment status for a specific course
const getCourseEnrollmentStatus = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { courseId } = req.params;

  if (!userId) {
    return res.status(200).json(
      new ApiResponse(200, { isEnrolled: false }, "User is not logged in")
    );
  }

  if (!courseId) {
    throw new ApiError(400, "Course ID is required");
  }

  const enrollment = await CourseEnrollment.findOne({
    user: userId,
    courseId,
    status: "active",
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        isEnrolled: !!enrollment,
        enrollment: enrollment || null,
      },
      "Enrollment status retrieved"
    )
  );
});

// Update progress or toggle completed lecture
const updateCourseProgress = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { courseId } = req.params;
  const { lectureId, totalLectures = 1, isCompleted = true } = req.body;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const enrollment = await CourseEnrollment.findOne({
    user: userId,
    courseId,
    status: "active",
  });

  if (!enrollment) {
    throw new ApiError(404, "Enrollment not found for this course");
  }

  if (lectureId) {
    const lectureSet = new Set(enrollment.completedLectures || []);
    if (isCompleted) {
      lectureSet.add(lectureId);
    } else {
      lectureSet.delete(lectureId);
    }
    enrollment.completedLectures = Array.from(lectureSet);
    
    // Calculate progress %
    const total = Math.max(Number(totalLectures) || 1, 1);
    const progress = Math.min(100, Math.round((enrollment.completedLectures.length / total) * 100));
    enrollment.progress = progress;
    if (progress >= 100) {
      enrollment.status = "completed";
    }
  }

  await enrollment.save();

  return res.status(200).json(
    new ApiResponse(200, enrollment, "Course progress updated successfully")
  );
});

export {
  purchaseCourse,
  getMyEnrolledCourses,
  getCourseEnrollmentStatus,
  updateCourseProgress,
};
