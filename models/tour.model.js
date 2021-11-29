const mongoose = require("mongoose");
const slugify = require("slugify");

const schema = mongoose.Schema({
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
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  rating: Number,
  ratingsAverage: Number,
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
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [
    {
      type: Date,
      required: true,
    },
  ],
  slug: String,
  startLocation: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  locations: [
    {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  tourGuides: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ],
});

schema.set("toJSON", { virtuals: true });
// schema.set("toObject", { virtuals: true });

// Virtual property
schema.virtual("weeks").get(function () {
  return this.durations / 7;
});

// Reviews
schema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "tour",
});

schema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

schema.pre(/^find|^save/, function (next) {
  this.populate({
    path: "tourGuides",
    select: "-_id -__v",
  });
  next();
});

module.exports = mongoose.model("Tour", schema);
