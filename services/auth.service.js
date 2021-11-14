const jwt = require("jsonwebtoken");

exports.sign = function (user) {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

exports.verify = function (token) {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
