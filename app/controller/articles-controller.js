const { selectArticle, selectArticles } = require("../model/select-articles");

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params;

  selectArticle(article_id)
    .then((result) => {
      res.status(200).send({ article: result });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  selectArticles()
    .then((articles) => {
      console.log(typeof articles[0].created_at);
      res.status(200).send({ articles: articles });
    })
    .catch((err) => {
      next(err);
    });
};
