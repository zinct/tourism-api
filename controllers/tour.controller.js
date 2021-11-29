const Tour = require("../models/tour.model");
const ApiResource = require("../utils/apiResource");

exports.getAllTours = async (req, res, next) => {
  let tours = new ApiResource(Tour.find(), req.query).filter().sort().fieldsLimit().limit();

  tours = await tours.query;
  res.json({ success: true, code: 200, data: tours });
};

exports.getTour = async (req, res) => {
  const tour = await Tour.findById(req.params.id).populate("reviews");
  res.json({ success: true, code: 200, data: tour });
};

exports.aliasTopThreeCheapest = (req, res, next) => {
  req.query.sort = "price";
  req.query.limit = "3";
  next();
};

exports.createTour = async (req, res) => {
  let tour = new Tour(req.body);
  tour = await tour.save();
  res.json({ success: true, code: 200, data: tour });
};

exports.updateTour = async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  res.json({ success: true, code: 200, data: tour });
};

exports.getTourStats = async (req, res) => {
  const stats = await Tour.aggregate([
    {
      $group: {
        _id: "null",
        ratingsAverage: { $avg: "$rating" },
        maxRating: { $max: "$rating" },
        minRating: { $min: "$rating" },
      },
    },
  ]);
  res.json({ success: true, code: 200, data: stats });
};

exports.deleteTour = async (req, res) => {
  await Tour.deleteOne({ _id: { $eq: req.params.id } });
  res.json({ success: true, code: 200, data: [] });
};
