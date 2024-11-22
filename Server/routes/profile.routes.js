import { Router } from "express";
import {
  completeProfile,
  updateProfile,
  getProfile,
} from "../controllers/profile.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/complete").post(
  verifyJwt, upload.single("profilePicture"),
  completeProfile
);

router.route("/get").get(verifyJwt, getProfile);
router
  .route("/updateProfile")
  .patch(verifyJwt, upload.single("newProfilePicture"), updateProfile);
export default router;
