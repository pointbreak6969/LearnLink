import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Resource from "../models/resourceModel.js";

const AddResources = asyncHandler(async (req, res) => {
  const { title, text } = req.body;
  const resourceLocations = req.files?.resource?.map((file) => file.path) || [];
  const classroomId = req.params?.classroomId || req.body?.classroomId;
  if (!resourceLocations.length) {
    throw new ApiError(400, "No resources provided");
  }
  if (resourceLocations.length > 10) {
    throw new ApiError(400, "Maximum 10 files allowed");
  }
  const uploadedResources = [];
  const failedUploads = [];
  for (const filePath of resourceLocations) {
    try {
      const uploadResult = await uploadOnCloudinary(filePath);
      if (uploadResult) {
        uploadedResources.push(uploadResult);
      } else {
        failedUploads.push(filePath);
      }
    } catch (error) {
      failedUploads.push(filePath);
    }
  }
  if (uploadedResources.length === 0) {
    throw new ApiError(400, "All file upload failed");
  }
  const resourceUrls = uploadedResources.map((resource) => resource.url);
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
  return res
    .status(200)
    .json(
      new ApiResponse(200, {
        resource: CreatedResource,
        failedUploads: failedUploads.length ? failedUploads : undefined,
      }),
      `Successfully added ${uploadedResources.length} resources${
        failedUploads.length ? ` (${failedUploads.length} failed)` : ""
      }`
    );
});

const getResource = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const resource = await Resource.find({ $text: { $search: title } });
  if (resource.length == 0) {
    throw new ApiError(400, "No resource found");
  }
  res.status(200).json(new ApiResponse(200, resource, "Resources found"));
});

const DeleteResource = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const resource = await Resource.findById(id);
  if (resource.owner.toString() != req.user._id.toString()) {
    throw new ApiError(
      403,
      "Unauthorized: Only the author can update this  Resource"
    );
  }
  const resourceUrl = Array.isArray(resource.resource)
    ? resource.resource[0]
    : resource.resource;

  const publicId = resourceUrl.split("/").pop().split(".")[0];
  await deleteFromCloudinary(publicId);
  const deleteResource = await Resource.findByIdAndDelete(id);

  if (!deleteResource) {
    throw new ApiError(400, "Failed to delete resource");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "", "Resource deleted successfully"));
});
const getUserUploadedResource = asyncHandler(async (req, res) => {});

export { AddResources, getResource, DeleteResource, getUserUploadedResource };
