const AppError = require("./appError");

function catchAsync(handler) {
  return (req, res, next) => {
    handler(req, res, next).catch(next);
  };
}

module.exports = catchAsync;
