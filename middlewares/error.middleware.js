const _ = require("lodash");
const AppError = require("../utils/appError");

exports.notFound = (req, res, next) => next(new AppError("Not found.", 404));

function handleDuplicateField(err) {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  return new AppError(`Duplicate field value: ${value} please use another value.`, 422);
}

function handleJwtError(err) {
  return new AppError(`Token is invalid.`, 403);
}

function handleJwtExpire(err) {
  return new AppError("Token is expired", 403);
}

function handleCastError(err) {
  return new AppError(`Invalid ${err.path}: ${err.value}.`, 422);
}

function handleValidatorError(err) {
  const errors = _.values(err.errors);
  return new AppError(
    "Validation Error",
    422,
    errors.map((e) => {
      return { name: e.path, message: e.message.replace("Path", "Field") };
    })
  );
}

function sendDevError(err, res) {
  res.json({
    success: false,
    code: err.statusCode || 500,
    message: err.message,
    data: err.data ?? err,
    stack: err.stack,
  });
}

function sendProdError(err, res) {
  if (err?.isOperational)
    return res.json({
      success: false,
      code: err.statusCode || 500,
      message: err.message,
      data: err.data,
    });

  return res.json({
    success: false,
    code: 500,
    message: "Sometime went wrong.",
  });
}

exports.globalError = function (err, req, res, next) {
  if (err?.name === "CastError") err = handleCastError(err);
  if (err?.name === "JsonWebTokenError") err = handleJwtError(err);
  if (err?.name === "TokenExpiredError") err = handleJwtExpire(err);
  if (err?.name === "ValidationError") err = handleValidatorError(err);
  if (err?.code === 11000) err = handleDuplicateField(err);

  if (process.env.NODE_ENV === "development") sendDevError(err, res);
  else if (process.env.NODE_ENV === "production") sendProdError(err, res);
};
