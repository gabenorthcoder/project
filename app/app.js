const express = require("express");
const cors = require("cors");
const { checkHealth } = require("./controller/healthcheck-controller");
const { getTopics } = require("./controller/topics-controller");
const { getApiEndPoints } = require("./controller/api-controller");
const {
  getArticle,
  getArticles,
  patchArticle,
} = require("./controller/articles-controller");
const {
  handleInvalidEndPoint,
  handleServerErrors,
  handleCustomErrors,
  handlePsqlErrors,
} = require("./errors");
const {
  getComments,
  postComment,
  deleteComment,
} = require("./controller/comments-controller");
const { getUsers } = require("./controller/users-controller");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", getApiEndPoints);
app.get("/api/healthcheck", checkHealth);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticle);
app.get("/api/articles/:article_id/comments", getComments);
app.post("/api/articles/:article_id/comments", postComment);
app.patch("/api/articles/:article_id", patchArticle);
app.delete("/api/comments/:comment_id", deleteComment);
app.get("/api/users", getUsers);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);
app.use(handleInvalidEndPoint);

module.exports = app;
