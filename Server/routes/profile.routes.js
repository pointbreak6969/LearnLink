import { Router } from "express";
import { CompleteProfile, EditProfileDetails, getProfile,editProfilePicture } from "../controllers/profile.controller.js";
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
router.route('/edit').patch(verifyJwt,EditProfileDetails)
router.route("/editProfilePic").patch(verifyJwt, upload.single("newProfilePic"), editProfilePicture )
export  default router