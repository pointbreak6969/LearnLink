import { ApiError } from "../utils/ApiError.js";

const checkOwnership = (model, resourceIdField) => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params[resourceIdField];
      const userId = req.user._id;

      // Find the resource by ID
      const resource = await model.findById(resourceId);

      if (!resource) {
        throw new ApiError(404, `${model.modelName} not found`);
      }

      // Check if the current user is the owner of the resource
      if (resource.owner.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to perform this action");
      }

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      next(error);
    }
  };
};

export { checkOwnership };