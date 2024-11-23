import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
  uploadFilesInBatches,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Resource from "../models/resourceModel.js";
import mongoose from "mongoose";
const AddResources = asyncHandler(async (req, res) => {
  const { text, title } = req.body;
  const resourceFiles = req.files?.resource || [];
  const classroomId = req.params?.classroomId || req.body?.classroomId;

  if (!resourceFiles.length) {
    throw new ApiError(400, "No resources provided");
  }

  const resourceLocations = resourceFiles.map((file) => file.path);

  // For single file, use direct upload instead of batch processing
  let uploadedResources;
  if (resourceLocations.length === 1) {
    const uploadResult = await uploadOnCloudinary(resourceLocations[0]);
    uploadedResources = uploadResult ? [uploadResult] : [];
  } else {
    // For multiple files, use batch processing
    uploadedResources = await uploadFilesInBatches(resourceLocations);
  }

  // Filter out any failed uploads
  const successfulUploads = uploadedResources.filter(
    (upload) => upload !== null
  );
  const failedUploads = resourceLocations.filter(
    (_, index) => !uploadedResources[index]
  );

  if (successfulUploads.length === 0) {
    throw new ApiError(400, "File upload failed");
  }

  const resourceUrls = successfulUploads.map((resource) => resource.url);

  // Create the resource document in the database
  const CreatedResource = await Resource.create({
    owner: req.user?._id,
    title,
    text,
    resource: resourceUrls,
    classroom: classroomId,
  });

  if (!CreatedResource) {
    throw new ApiError(400, "Failed to add resource");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        resource: CreatedResource,
        failedUploads: failedUploads.length ? failedUploads : undefined,
      },
      successfulUploads.length === 1
        ? "Successfully added resource"
        : `Successfully added ${successfulUploads.length} resources${
            failedUploads.length ? ` (${failedUploads.length} failed)` : ""
          }`
    )
  );
});

const getResourceByTitle = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const resource = await Resource.find({ $text: { $search: title } });
  if (resource.length == 0) {
    throw new ApiError(400, "No resource found");
  }
  res.status(200).json(new ApiResponse(200, resource, "Resources found"));
});

const DeleteResource = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate resource ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid resource ID format");
  }

  // Find the resource and verify existence
  const resource = await Resource.findById(id);
  if (!resource) {
    throw new ApiError(404, "Resource not found");
  }

  // Check authorization
  if (resource.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized: Only the resource owner can delete this resource");
  }

  // Normalize resource URLs to array
  const resourceUrls = Array.isArray(resource.resource) 
    ? resource.resource 
    : [resource.resource];

  // Track deletion results
  const deletionResults = {
    successful: [],
    failed: [],
  };

  // Process each resource URL
  await Promise.all(resourceUrls.map(async (resourceUrl) => {
    try {
      // Extract public ID from URL
      const urlParts = resourceUrl.split('/');
      const fileNameWithExtension = urlParts[urlParts.length - 1];
      const publicId = fileNameWithExtension.split('.')[0];

      // Delete from Cloudinary
      const cloudinaryResponse = await deleteFromCloudinary(publicId);
      
      if (cloudinaryResponse && cloudinaryResponse.result === 'ok') {
        deletionResults.successful.push(publicId);
      } else {
        deletionResults.failed.push({
          publicId,
          error: cloudinaryResponse?.result || 'Unknown error',
          url: resourceUrl
        });
      }
    } catch (error) {
      deletionResults.failed.push({
        publicId: resourceUrl.split('/').pop().split('.')[0],
        error: error.message || 'Failed to delete from Cloudinary',
        url: resourceUrl
      });
      console.error(`Failed to delete file from Cloudinary: ${resourceUrl}`, error);
    }
  }));

  try {
    // Delete the resource document from database
    const deletedResource = await Resource.findByIdAndDelete(id);
    if (!deletedResource) {
      throw new ApiError(400, "Failed to delete resource from database");
    }

    // Prepare response message
    let message = "Resource deleted successfully";
    if (deletionResults.failed.length > 0) {
      if (deletionResults.successful.length > 0) {
        message = `Resource partially deleted. ${deletionResults.successful.length} file(s) deleted, ${deletionResults.failed.length} file(s) failed`;
      } else {
        message = `Resource document deleted but all ${deletionResults.failed.length} file(s) failed to delete from storage`;
      }
    } else if (deletionResults.successful.length > 0) {
      message = `Resource and all ${deletionResults.successful.length} file(s) deleted successfully`;
    }

    // Send response
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          deletedResourceId: id,
          deletionResults: deletionResults.failed.length > 0 ? deletionResults : undefined,
          totalDeleted: deletionResults.successful.length,
          totalFailed: deletionResults.failed.length
        },
        message
      )
    );
  } catch (error) {
    // If database deletion fails but some files were deleted from Cloudinary
    if (deletionResults.successful.length > 0) {
      console.error('Database deletion failed but some files were deleted from Cloudinary:', {
        successful: deletionResults.successful,
        failed: deletionResults.failed
      });
    }
    throw new ApiError(500, "Failed to delete resource from database");
  }
});
const getUserUploadedResource = asyncHandler(async (req, res) => {});

export {
  AddResources,
  getResourceByTitle,
  DeleteResource,
  getUserUploadedResource,
};
