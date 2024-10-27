import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createClassroom, updateClassroom, deleteClassroom } from "../controllers/classroom.controller.js";
const router = Router()

router.route("/createClassroom").post(verifyJwt, createClassroom)
router.route("/updateClassroom/:id").patch(verifyJwt, updateClassroom)
router.route("/deleteClassroom/:id").delete(verifyJwt, deleteClassroom)
export default router;