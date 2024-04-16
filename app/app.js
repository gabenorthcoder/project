const express = require("express");
const { checkHealth } = require("./controller/healthcheck-controller");
const { getTopics } = require("./controller/topics-controller");
const { getApiEndPoints } = require("./controller/api-controller");
const { getArticle } = require("./controller/articles-controller");
const {
  handleInvalidEndPoint,
  handleServerErrors,
  handleCustomErrors,
} = require("./errors");
const app = express();
app.use(express.json());

app.get("/api/healthcheck", checkHealth);
app.get("/api/topics", getTopics);
app.get("/api", getApiEndPoints);
app.get("/api/articles/:article_id", getArticle);

app.use(handleCustomErrors);
app.use(handleServerErrors);
app.use(handleInvalidEndPoint);

module.exports = app;
