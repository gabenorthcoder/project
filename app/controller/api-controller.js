const { selectApiEndPoints } = require("../model/select-api");

exports.getApiEndPoints = (req, res, next) => {
  const result = selectApiEndPoints();
  res.status(200).send({ endPoints: result });
};
