import { Router } from "express";
import { AddResources, DeleteResource, getResourceByTitle } from "../controllers/resource.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router=Router()


router.route('/add').post(
    verifyJwt,
    upload.fields([
        {
            name:"resource",
            maxCount:25
        },
    ]),
    AddResources
)

router.route('/get').get(getResourceByTitle)
router.route('/delete/:id').delete(verifyJwt,DeleteResource)

export default router