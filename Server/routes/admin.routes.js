import { Router } from "express";
import { verifyJwt, requireSuperAdmin } from "../middlewares/auth.middleware.js";
import {
  getPlatformStats,
  getAllUsers,
  getUserDetails,
  updateUserRole,
  deleteUser,
  getAllClassroomsAdmin,
  updateClassroomAdmin,
  deleteClassroomAdmin,
  getAllPendingRequests,
  handlePendingRequest,
} from "../controllers/admin.controller.js";

const router = Router();

// Apply auth + superadmin check to all admin routes
router.use(verifyJwt, requireSuperAdmin);

router.route("/stats").get(getPlatformStats);
router.route("/users").get(getAllUsers);
router.route("/users/:id").get(getUserDetails);
router.route("/users/:id/role").patch(updateUserRole);
router.route("/users/:id").delete(deleteUser);

router.route("/classrooms").get(getAllClassroomsAdmin);
router.route("/classrooms/:id").patch(updateClassroomAdmin).delete(deleteClassroomAdmin);

router.route("/pending-requests").get(getAllPendingRequests);
router.route("/handle-request").post(handlePendingRequest);

export default router;
