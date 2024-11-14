import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createClassroom, updateClassroom, deleteClassroom, getAllClassrooms, getClassroomByUniversityAndFaculty,joinClassroom, getClassroomDetails } from "../controllers/classroom.controller.js";
const router = Router()

router.route("/createClassroom").post(verifyJwt, createClassroom)
router.route("/updateClassroom/:id").patch(verifyJwt, updateClassroom)
router.route("/deleteClassroom/:id").delete(verifyJwt, deleteClassroom)
router.route("/getAllClassrooms").get(verifyJwt, getAllClassrooms)
router.route("/getClassroomByQuery").get(verifyJwt, getClassroomByUniversityAndFaculty)
router.route("/joinClassroom").post(verifyJwt, joinClassroom)
router.route("/getClassroomDetails/:classroomId").get(verifyJwt, getClassroomDetails)
export default router;