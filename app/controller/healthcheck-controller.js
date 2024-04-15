exports.checkHealth = (req, res) => {
  res.status(200).send({ healthcheck: "OK" });
};
