const express = require("express");
const { checkHealth } = require("./controller/healthcheck-controller");
const { handleInvalidEndPoint } = require("./errors");
const { getTopics } = require("./controller/topics-controller");
const app = express();
app.use(express.json());

app.get("/api/healthcheck", checkHealth);
app.get("/api/topics", getTopics);

app.use(handleServerErrors);
app.use(handleInvalidEndPoint);

module.exports = app;
