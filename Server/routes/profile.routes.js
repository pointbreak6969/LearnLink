import { Router } from "express";
import { EditProfile, getProfile } from "../controllers/profile.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router=Router()

router.route('/edit').post(
    verifyJwt,
    upload.fields([
        {
            name:'profilePicture',
            maxCount:1
        }
    ]),
    EditProfile
)

router.route('/get').get(verifyJwt, getProfile)

export  default router