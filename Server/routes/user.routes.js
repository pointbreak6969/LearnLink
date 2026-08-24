import { Router } from "express";
import rateLimit from "express-rate-limit";
import {registerUser, loginUser, logoutUser, getCurrentUser, getUserAllClassrooms, refreshAccessToken} from "../controllers/user.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many attempts from this IP, please try again after 15 minutes",
});

router.route("/register").post(authLimiter, registerUser);
router.route("/login").post(authLimiter, loginUser);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/me").get(verifyJwt, getCurrentUser);
router.route("/getUserAllClassrooms").get(verifyJwt, getUserAllClassrooms)
router.route("/refreshAccessToken").post(refreshAccessToken);
export default router;
