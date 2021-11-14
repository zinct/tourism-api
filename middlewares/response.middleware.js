exports.json = (req, res, next) => {
  let oldJson = res.json;
  res.json = function (data) {
    res.json = oldJson; // set function back to avoid the 'double-json'
    return res.json(data); // just call as normal with data
  };
  next();
};
