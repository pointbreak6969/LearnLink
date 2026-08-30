import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  purchaseCourse,
  getMyEnrolledCourses,
  getCourseEnrollmentStatus,
  updateCourseProgress,
} from "../controllers/course.controller.js";

const router = Router();

// Purchase / enroll in a course (requires login)
router.route("/purchase").post(verifyJwt, purchaseCourse);

// Get my enrolled courses (requires login)
router.route("/my-courses").get(verifyJwt, getMyEnrolledCourses);

// Check if user is enrolled in course
router.route("/status/:courseId").get(verifyJwt, getCourseEnrollmentStatus);

// Update progress
router.route("/progress/:courseId").patch(verifyJwt, updateCourseProgress);

export default router;
