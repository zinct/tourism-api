const Review = require("../models/review.model");
const Tour = require("../models/tour.model");
const ApiResource = require("../utils/apiResource");
const AppError = require("../utils/appError");

exports.getAllReviews = async function (req, res) {
  const reviews = await Review.find({ tour: req.params.tourId });
  return res.json({ status: true, code: 200, data: { reviews } });
};

exports.createReview = async function (req, res, next) {
  // Check if tourId is exists
  const tour = await Tour.findById(req.params.tourId);
  if (!tour) return next(new AppError("Tour id is invalid"));

  let review = new Review({
    review: req.body.review,
    rating: req.body.rating,
    tour: req.params.tourId,
    user: req.user._id,
  });

  review = await review.save();
  return res.json({ status: true, code: 200, data: { review } });
};
