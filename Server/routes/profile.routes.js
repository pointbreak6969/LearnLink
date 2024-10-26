import { Router } from "express";
import { EditProfile } from "../controllers/profile.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router=Router()

router.route('/edit').post(
    upload.fields([
        {
            name:'profilePicture',
            maxCount:1
        }
    ]),
    EditProfile
)

export  default router