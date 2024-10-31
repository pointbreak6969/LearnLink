import {v2 as cloudinary} from "cloudinary";
import fs from "fs"
//cloudinary configuration
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


const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) {
      console.error("No public ID provided for deletion");
      return null;
    }

    // Delete the file from Cloudinary
    const response = await cloudinary.uploader.destroy(publicId);
    console.log("Cloudinary delete response:", response);

    if (response.result === "not found") {
      console.error("Public ID not found in Cloudinary.");
      return null;
    }

    return response;
  } catch (error) {
    console.error("Error while deleting from Cloudinary:", error);
    return null;
  }
};


export {uploadOnCloudinary,deleteFromCloudinary};