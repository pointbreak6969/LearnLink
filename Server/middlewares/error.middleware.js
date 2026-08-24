const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";

  // Only trust messages from errors we deliberately threw (ApiError sets statusCode).
  // Unexpected errors (raw Mongoose/driver errors, etc.) can leak internal details, so
  // mask them behind a generic message in production.
  const isKnownError = Boolean(err.statusCode);
  const message =
    isKnownError || !isProduction
      ? err.message || "Internal Server Error"
      : "Internal Server Error";

  res.status(statusCode).json({
    message,
    success: false,
    ...(isProduction ? {} : { stack: err.stack }),
  });
};
export { errorHandler };
