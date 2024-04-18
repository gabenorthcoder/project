const db = require("../../db/connection.js");
exports.selectArticle = (article_id) => {
  return db
    .query(
      `SELECT    articles.author,
      articles.title,
      articles.article_id,
      articles.body,
      articles.topic,
      articles.created_at,
      articles.votes,
      articles.article_img_url,
 CAST(COUNT(comments.article_id)AS INT) AS comment_count
  FROM articles
  LEFT JOIN comments
  ON articles.article_id = comments.article_id
  WHERE articles.article_id = $1
  GROUP BY articles.article_id
   ;`,
      [article_id]
    )

    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }

      return result.rows[0];
    });
};

exports.selectArticles = (topic) => {
  let sqlString = `SELECT    
  articles.author,
  articles.title,
  articles.article_id,
  articles.topic,
  articles.created_at,
  articles.votes,
  articles.article_img_url,
COUNT(comments.article_id) AS comment_count
FROM articles
LEFT JOIN comments
ON articles.article_id = comments.article_id `;

  const queryParams = [];
  if (topic) {
    const newTopic = `%${topic}%`;
    sqlString += `WHERE articles.topic LIKE $1 `;
    queryParams.push(newTopic);
  }
  sqlString += `GROUP BY articles.article_id
ORDER BY articles.created_at DESC;`;

  return db.query(sqlString, queryParams).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    return rows;
  });
};
