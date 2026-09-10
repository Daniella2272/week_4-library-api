function validateCreateBook(req, res, next) {
  const allowedFields = [
    "title",
    "author",
    "isbn",
    "genre",
    "publishedYear",
    "copiesTotal",
    "copiesAvailable",
  ];

  const unknownFields = Object.keys(req.body).filter(
    (field) => !allowedFields.includes(field)
  );

  if (unknownFields.length > 0) {
    const error = new Error("Unknown fields are not allowed");
    error.status = 400;
    error.details = unknownFields;
    return next(error);
  }

  const requiredFields = ["title", "author", "isbn"];
  const missingFields = requiredFields.filter(
    (field) => req.body[field] === undefined
  );

  if (missingFields.length > 0) {
    const error = new Error("Required fields are missing");
    error.status = 400;
    error.details = missingFields;
    return next(error);
  }

  next();
}

function validateUpdateBook(req, res, next) {
  const allowedFields = [
    "title",
    "author",
    "isbn",
    "genre",
    "publishedYear",
    "copiesTotal",
  ];

  const unknownFields = Object.keys(req.body).filter(
    (field) => !allowedFields.includes(field)
  );

  if (unknownFields.length > 0) {
    const error = new Error("Unknown fields are not allowed");
    error.status = 400;
    error.details = unknownFields;
    return next(error);
  }

  next();
}

module.exports = {
  validateCreateBook,
  validateUpdateBook,
};