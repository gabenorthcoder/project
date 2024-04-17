const db = require("../../db/connection.js");
exports.selectComments = (article_id) => {
  return db
    .query(
      `SELECT    comment_id,
      votes,
      created_at,
      author,
      body,
      article_id 
      FROM comments WHERE article_id = $1
      ORDER BY created_at DESC;`,
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};
