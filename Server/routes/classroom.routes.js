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
export default router;
