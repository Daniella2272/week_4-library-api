require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is required");
}

module.exports = {
  MONGODB_URI,
  PORT,
};