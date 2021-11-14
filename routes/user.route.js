const express = require("express");
const Router = express.Router();

const validate = require("../middlewares/validate.middleware");
const authValidator = require("../validators/auth.validator");
const authController = require("../controllers/auth.controller");

// Router.get("/register", validate(authValidator.register), authController.register);

module.exports = Router;
