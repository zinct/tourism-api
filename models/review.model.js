const mongoose = require("mongoose");

const schema = mongoose.Schema({
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  tour: {
    type: mongoose.Types.ObjectId,
    ref: "Tour",
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

schema.pre(/^find|^save/, function (next) {
  this.populate({ path: "user", select: "-_id -__v" });
  next();
});

module.exports = mongoose.model("Review", schema);
