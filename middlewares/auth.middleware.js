const User = require("../models/user.model");
const authService = require("../services/auth.service");
const AppError = require("../utils/appError");

exports.auth = async (req, res, next) => {
  // Check if is token exist
  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
    return next(new AppError("Unauthorize", 403));
  }

  // Getting token
  const token = req.headers.authorization.split(" ")[1];

  // Validate token
  const { user } = authService.verify(token);

  // Check if user still exists
  const freshUser = await User.findById(user._id);
  if (!freshUser) return next(new AppError("Unauthorize", 403));

  // Check if user changed password before
  if (user.password !== freshUser.password) {
    return next(new AppError("Unauthorize", 403));
  }

  req.user = user;
  next();
};

exports.guest = (req, res, next) => {
  console.log("GUESSTT...");
  next();
};
