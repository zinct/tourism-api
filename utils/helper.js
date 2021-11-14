const crypto = require("crypto");

exports.generateRandomString = () => {
  return crypto.randomBytes(8).toString("hex");
};
