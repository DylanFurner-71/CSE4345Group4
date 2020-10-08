import ErrorResponse from "../utils/errorResponse.js";

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // log to console for dev
  //console.log(err);

  // Mongoose CastError (Cant find resource)
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  // Mongoose Validation Error
  else if (err.name === "ValidationError") {
    const message = error.message.substring(error.message.indexOf(":") + 2);
    error = new ErrorResponse(message, 400);
  }
  // Other Types of Errors
  else {
    error = new ErrorResponse(error.message, 500);
  }

  //Respondign with Handled Error
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};
