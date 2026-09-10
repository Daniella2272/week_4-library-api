function errorHandler(err, req, res, next) {
  let status = 500;
  let message = "Internal server error";
  let details = [];

  if (err.name === "ValidationError") {
    status = 400;
    message = "Validation failed";

    details = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));
  } else if (err.name === "CastError") {
    status = 400;
    message = "Invalid value";
    details = [err.path];
  } else if (err.code === 11000) {
    status = 409;
    message = "A book with this ISBN already exists";
    details = ["isbn"];
  } else if (err.status) {
    status = err.status;
    message = err.message;

    if (err.details) {
      details = err.details;
    }
  }

  res.status(status).json({
    error: {
      message,
      details,
    },
  });
}

module.exports = errorHandler;