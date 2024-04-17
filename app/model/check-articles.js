const db = require("../../db/connection.js");
const articles = require("../../db/data/test-data/articles.js");
exports.checkArticleExists = (article_id) => {
  return db
    .query(
      `
SELECT * 
FROM articles 
WHERE article_id = $1;`,
      [article_id]
    )
    .then(({ rows: articles }) => {
      if (articles.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
    });
};
