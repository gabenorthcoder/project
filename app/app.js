const express = require("express");
const { checkHealth } = require("./controller/healthcheck-controller");
const { handleInvalidEndPoint, handleServerErrors } = require("./errors");
const { getTopics } = require("./controller/topics-controller");
const { getApiEndPoints } = require("./controller/api-controller");
const app = express();
app.use(express.json());

app.get("/api/healthcheck", checkHealth);
app.get("/api/topics", getTopics);
app.get("/api", getApiEndPoints);

app.use(handleServerErrors);
app.use(handleInvalidEndPoint);

module.exports = app;
