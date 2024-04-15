exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};
exports.handleInvalidEndPoint =
  ("*",
  (req, res) => {
    res.status(404).send({ msg: "Not Found" });
  });
