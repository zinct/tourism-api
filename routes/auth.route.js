const express = require("express");
const Router = express.Router();

const validate = require("../middlewares/validate.middleware");
const authValidator = require("../validators/auth.validator");
const authController = require("../controllers/auth.controller");

Router.post("/register", validate(authValidator.register), authController.register);
Router.post("/login", validate(authValidator.login), authController.login);
Router.post("/forgot-password", validate(authValidator.forgotPassword), authController.forgotPassword);
Router.post("/reset-password/:token", validate(authValidator.resetPassword), authController.resetPassword);

module.exports = Router;
