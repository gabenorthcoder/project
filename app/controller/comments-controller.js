const { checkArticleExists } = require("../model/check-articles");
const { insertComment } = require("../model/intsert-comments");
const { removeComment } = require("../model/remove-comments");
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

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
