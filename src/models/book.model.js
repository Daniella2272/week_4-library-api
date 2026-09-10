const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 200,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    genre: {
      type: String,
      enum: ["Fiction", "Non-fiction", "Science", "History", "Other"],
    },

    publishedYear: {
      type: Number,
      min: 1450,
      max: new Date().getFullYear(),
      validate: {
        validator: Number.isInteger,
        message: "publishedYear must be an integer",
      },
    },

    copiesTotal: {
      type: Number,
      min: 1,
      default: 1,
      validate: {
        validator: Number.isInteger,
        message: "copiesTotal must be an integer",
      },
    },

    copiesAvailable: {
      type: Number,
      min: 0,
      default: 1,
      validate: {
        validator: Number.isInteger,
        message: "copiesAvailable must be an integer",
      },
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.path("copiesAvailable").validate(function (value) {
  return value <= this.copiesTotal;
}, "copiesAvailable cannot be greater than copiesTotal");

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;