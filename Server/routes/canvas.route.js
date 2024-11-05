import { Router } from "express";
import verifyJwt from "../middlewares/auth.middleware.js"
import { createCanvas, getCanvas, updateCanvas } from "../controllers/canvas.controller.js";
const router = Router()
router.route("/createCanvas").post(verifyJwt, createCanvas)
router.route("/getCanvas/:id").get(verifyJwt, getCanvas)
router.route("/updateCanvas/:id").put(verifyJwt, updateCanvas)
export default router;