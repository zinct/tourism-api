const AppError = require("../utils/appError");
const { model: mongooseModel } = require("mongoose");
const niv = require("node-input-validator");

niv.extend("unique", async function ({ value, args }) {
  const model = args[0];
  const field = args[1];

  const isIsset = Boolean(
    await mongooseModel(model)
      .findOne({ [field]: { $eq: value } })
      .select(field)
  );

  return !isIsset;
});

niv.extend("exists", async function ({ value, args }) {
  const model = args[0];
  const field = args[1];

  const isIsset = Boolean(
    await mongooseModel(model)
      .findOne({ [field]: { $eq: value } })
      .select(field)
  );

  return isIsset;
});

module.exports = function (validatorSchema) {
  return async (req, res, next) => {
    const validator = new niv.Validator(req.body, validatorSchema);
    const isValid = await validator.check();

    if (!isValid) return next(new AppError("Validation Error", 422, validator.errors));
    return next();
  };
};
