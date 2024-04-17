const { checkArticleExists } = require("../model/check-articles");
const { insertComment } = require("../model/intsert-comments");
const { selectComments } = require("../model/select-comments");

exports.getComments = (req, res, next) => {
  const { article_id } = req.params;
  Promise.all([selectComments(article_id), checkArticleExists(article_id)])

    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const comment = req.body;
  insertComment(article_id, comment)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
