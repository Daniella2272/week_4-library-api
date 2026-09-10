const express = require("express");
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller");
const {
  validateCreateBook,
  validateUpdateBook,
} = require("../middleware/validate");

const router = express.Router();

router.post("/", validateCreateBook, createBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.patch("/:id", validateUpdateBook, updateBook);
router.delete("/:id", deleteBook);

module.exports = router;