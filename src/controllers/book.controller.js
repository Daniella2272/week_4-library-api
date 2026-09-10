const mongoose = require("mongoose");
const Book = require("../models/book.model");
function createError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}
async function createBook(req, res, next) {
  try {
    const bookData = {
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      genre: req.body.genre,
      publishedYear: req.body.publishedYear,
      copiesTotal: req.body.copiesTotal,
      copiesAvailable: req.body.copiesAvailable,
    };
    const book = await Book.create(bookData);
    res.location(`/api/books/${book._id}`);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
}
async function getBooks(req, res, next) {
  try {
    const filter = {};
    if (req.query.author) {
      filter.author = req.query.author;
    }
    if (req.query.genre) {
      filter.genre = req.query.genre;
    }
    const books = await Book.find(filter);
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
}
async function getBookById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return next(createError(400, "Invalid book id"));
    }
    const book = await Book.findById(req.params.id);
    if (!book) {
      return next(createError(404, "Book not found"));
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
}
async function updateBook(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return next(createError(400, "Invalid book id"));
    }
    const updateData = {};
    const allowedFields = [
      "title",
      "author",
      "isbn",
      "genre",
      "publishedYear",
      "copiesTotal",
    ];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!book) {
      return next(createError(404, "Book not found"));
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
}
async function deleteBook(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return next(createError(400, "Invalid book id"));
    }
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return next(createError(404, "Book not found"));
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};