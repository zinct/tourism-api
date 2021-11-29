const express = require("express");
const Router = express.Router();

const reviewRouter = require("../routes/review.route");

const validate = require("../middlewares/validate.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

// Controller
const tourController = require("../controllers/tour.controller");
const tourValidator = require("../validators/tour.validator");

Router.get("/", tourController.getAllTours);
Router.post("/", validate(tourValidator.create), tourController.createTour);
Router.get("/:id", tourController.getTour);
Router.post("/:id", tourController.updateTour);
Router.delete("/:id", authMiddleware.auth, tourController.deleteTour);
Router.get("/top-3-cheapest", tourController.aliasTopThreeCheapest, tourController.getAllTours);
Router.get("/stats", tourController.getTourStats);

// Reviews
Router.use("/:tourId/reviews", reviewRouter);

module.exports = Router;
