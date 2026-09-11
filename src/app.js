const express = require("express");
const apiRoutes = require("./routes");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const mongoose = require("mongoose");

const app = express();
app.get("/health", (req, res) => {
  const connected = mongoose.connection.readyState === 1;

  res.status(connected ? 200 : 503).json({
    status: connected ? "ok" : "unavailable",
    database: connected ? "connected" : "disconnected",
  });
});

app.use(express.json());
app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;