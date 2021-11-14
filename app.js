const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");

// Middlewares
const error = require("./middlewares/error.middleware");
const response = require("./middlewares/response.middleware");

const app = express();
app.use(express.urlencoded({ extended: true }));

// Connecting database
mongoose
  .connect("mongodb://localhost:27017/tourism")
  .then(() => {
    console.log("Success connected to database...");
  })
  .catch((err) => {
    console.log("Error while connecting to database...", err.message);
  });

// Router
const tourRoute = require("./routes/tour.route");
const authRoute = require("./routes/auth.route");

// Overide Repsonse Json
app.use(response.json);

// Route
app.use("/v1/", authRoute);
app.use("/v1/tours", tourRoute);

// Not found handler
app.all("*", error.notFound);

// Error Handler
app.use(error.globalError);

module.exports = app;
