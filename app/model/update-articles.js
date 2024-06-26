const db = require("../../db/connection.js");
const { convertTimestampToDate } = require("../../db/seeds/utils.js");

exports.updateArticle = (article_id, { inc_votes }) => {
  return db
    .query(
      `UPDATE articles 
  SET votes = votes + $1
  WHERE article_id = $2
  RETURNING *;`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return rows[0];
    });
};
