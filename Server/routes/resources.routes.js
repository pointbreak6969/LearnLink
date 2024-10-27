import { Router } from "express";
import { AddResources } from "../controllers/resource.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router=Router()


router.route('/add').post(
    verifyJwt,
    upload.fields([
        {
            name:"resource",
            maxCount:10
        },
    ]),
    AddResourcesa
)

export default router