const express = require("express");
const { checkHealth } = require("./controller/healthcheck-controller");
const { getTopics } = require("./controller/topics-controller");
const { getApiEndPoints } = require("./controller/api-controller");
const { getArticle, getArticles } = require("./controller/articles-controller");
const {
  handleInvalidEndPoint,
  handleServerErrors,
  handleCustomErrors,
  handlePsqlErrors,
} = require("./errors");
const { getComments } = require("./controller/comments-controller");
const app = express();
app.use(express.json());

app.get("/api", getApiEndPoints);
app.get("/api/healthcheck", checkHealth);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticle);
app.get("/api/articles/:article_id/comments", getComments);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);
app.use(handleInvalidEndPoint);

module.exports = app;
