import { Router } from "express";
import { CompleteProfile, EditProfile, getProfile } from "../controllers/profile.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router=Router()

router.route('/complete').post(
    verifyJwt,
    upload.fields([
        {
            name:'profilePicture',
            maxCount:1
        }
    ]),
    CompleteProfile
)

router.route('/get').get(verifyJwt, getProfile)
router.route('/edit').put(verifyJwt,EditProfile)
export  default router