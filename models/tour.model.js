const mongoose = require("mongoose");
const slugify = require("slugify");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    durations: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 5,
    },
    price: {
      type: Number,
      required: true,
    },
    priceDiscount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    summary: {
      type: String,
      trim: true,
    },
    images: [String],
    imageCover: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    slug: String,
  },
  { toJson: { weeks: true } }
);

schema.set("toJSON", { virtuals: true });
schema.set("toObject", { virtuals: true });

schema.virtual("weeks").get(function () {
  return this.durations / 7;
});

schema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Tour = mongoose.model("Tour", schema);

module.exports = Tour;
