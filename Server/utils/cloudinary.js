import {v2 as cloudinary} from "cloudinary";
import fs from "fs"
//cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
//first we take path from user using multer. save it in a file locally which is called localFilePath. then we provide that file to cloudinary. we do this because if the user have low internet bandwidth also then the file can be easily uploaded to a storage server from our server
const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath) return null;
        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, { //check documentation
            resource_type: "auto"
        })
        fs.unlinkSync(localFilePath) //since we are taking localFilePath and storing in our server we need to delete those file after completion so there wouldn't be any mess. 
        return response
    } catch (error) {
        //if error also delete the local file from the serer
        fs.unlinkSync(localFilePath)
        console.log("Error while uploading on cloudinary", error)
        return null
    }
}

export {uploadOnCloudinary};