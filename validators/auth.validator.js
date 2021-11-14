exports.register = {
  name: "required",
  email: "required|email|unique:User,email",
  password: "required",
  password_confirmation: "required|same:password",
  image: "nullable",
};

exports.login = {
  email: "required",
  password: "required",
};

exports.forgotPassword = {
  email: "required|exists:User,email",
};

exports.resetPassword = {
  email: "required|exists:User,email",
  password: "required",
  password_confirmation: "required|same:password",
};
