const express = require("express");
const Router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

// Controller
const tourController = require("../controllers/tour.controller");

Router.get("/", authMiddleware.auth, tourController.getAllTours);
Router.post("/", tourController.createTour);
Router.get("/:id", tourController.getTour);
Router.post("/:id", tourController.updateTour);
Router.delete("/:id", authMiddleware.auth, tourController.deleteTour);
Router.get("/top-3-cheapest", tourController.aliasTopThreeCheapest, tourController.getAllTours);
Router.get("/stats", tourController.getTourStats);

module.exports = Router;
