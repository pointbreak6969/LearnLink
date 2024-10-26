import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (localFilePath) {
        //upload the file on cloudinary
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
      });
      //file has been uploaded successfully
      fs.unlinkSync(localFilePath);
      return response;
    }
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log("Error while uploading on cloudinary", error);
    return null;
  }
};

const deleteFromCloudinary = async (oldImageUrl, publicId) =>{
    try {
        if (!(oldImageUrl || publicId)){
            throw new ApiError(404, "No Image Found to be deleted");
        }
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: `${oldImageUrl.includes("image") ? "image" : "video"}`
        });
        console.log("Asset Deleted Successfully", result);
    } catch(error){
        console.log("Error while deleting the asset", error);
        throw new ApiError(500, error?.message || "Server Error while deleting the asset");
    }
}

export { uploadOnCloudinary, deleteFromCloudinary };
