const User = require("../models/user.model");
const AppError = require("../utils/appError");
const authService = require("../services/auth.service");
const bcrypt = require("bcrypt");
const mailService = require("../services/mail.service");
const { generateRandomString } = require("../utils/helper");

exports.register = async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    image: req.body.image,
  });

  const token = authService.sign(user);
  return res.json({ success: true, code: 200, data: { user, token } });
};

exports.login = async (req, res, next) => {
  // Check if email is exists
  const user = await User.findOne({ email: { $eq: req.body.email } });
  // Check if password is correct
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) return next(new AppError("Bad Credentials.", 403));

  const token = authService.sign(user);
  return res.json({ success: true, code: 200, data: { user, token } });
};

exports.forgotPassword = async (req, res, next) => {
  // Get user from requested email
  const user = await User.findOne({ email: { $eq: req.body.email } });

  // Generate random token
  const token = generateRandomString();

  // Hash token
  const hashedToken = await bcrypt.hash(token, 8);

  // Save hashed token into database
  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  // Send to email user
  const forgotLink = `${process.env.SITE_URL}/reset-password/${token}`;
  await mailService.send({
    to: "indramahesa128@gmail.com",
    subject: "Forgot Password",
    text: `You have requested to reset password of your TOURISM account. please enter link below ${forgotLink}`,
  });

  return res.json({ success: true, code: 200, data: { message: "Your forgot password link has sended to your email." } });
};

exports.resetPassword = async (req, res, next) => {
  // Get user from requested email
  const user = await User.findOne({ email: { $eq: req.body.email } });

  // Check if token is valid or already expire
  const isValid = await bcrypt.compare(req.params.token, user.passwordResetToken);

  if (!isValid || Date.now() > user.passwordResetExpires) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return next(new AppError("Your token is invalid or expired", 400));
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  return res.json({ success: true, code: 200 });
};
