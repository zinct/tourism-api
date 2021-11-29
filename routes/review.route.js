const express = require("express");
const Router = express.Router({ mergeParams: true });

const validate = require("../middlewares/validate.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

// Controller
const reviewController = require("../controllers/review.controller");
const reviewValidator = require("../validators/review.validator");

Router.get("/", reviewController.getAllReviews);
Router.post("/", authMiddleware.auth, validate(reviewValidator.create), reviewController.createReview);

module.exports = Router;
