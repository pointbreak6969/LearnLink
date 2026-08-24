import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createClassroom,
  updateClassroom,
  deleteClassroom,
  getAllClassrooms,
  getClassroomByUniversityAndFaculty,
  joinClassroom,
  getClassroomDetails,
  getSuggestedClassrooms,
  getClassroomUsers,
  requestToJoinclassRoom,
  userRequestToadmin,
  getJoinRequests,
  addCoAdmin,
  removeCoAdmin,
  removeMember,
  leaveClassroom,
} from "../controllers/classroom.controller.js";

const router = Router();

router.route("/createClassroom").post(verifyJwt, createClassroom);
router.route("/updateClassroom/:id").patch(verifyJwt, updateClassroom);
router.route("/deleteClassroom/:id").delete(verifyJwt, deleteClassroom);
router.route("/getAllClassrooms").get(getAllClassrooms);
router.route("/getClassroomByQuery").get(getClassroomByUniversityAndFaculty);
router.route("/joinClassroom").post(verifyJwt, joinClassroom);
router.route("/joinClassroom/:code").post(verifyJwt, joinClassroom);
router
  .route("/getClassroomDetails/:classroomId")
  .get(verifyJwt, getClassroomDetails);
router.route("/getSuggestedClassrooms").get(verifyJwt, getSuggestedClassrooms);
router.route("/getPublicClassrooms").get(getSuggestedClassrooms);
router.route("/getClassroomUsers/:classroomId").get(verifyJwt, getClassroomUsers);
router.route("/request").post(verifyJwt, requestToJoinclassRoom);
router.route("/getJoinRequests/:id").get(verifyJwt, getJoinRequests);
router.route("/userRequestToadmin").post(verifyJwt, userRequestToadmin);

// Co-admin and member management routes
router.route("/:id/co-admins").post(verifyJwt, addCoAdmin);
router.route("/:id/co-admins/:userId").delete(verifyJwt, removeCoAdmin);
router.route("/:id/members/:userId").delete(verifyJwt, removeMember);
router.route("/:id/leave").post(verifyJwt, leaveClassroom);

export default router;
