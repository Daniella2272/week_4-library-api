const express = require("express");
const apiRoutes = require("./routes");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

const app = express();

app.use(express.json());
app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;