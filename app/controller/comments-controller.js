const { checkArticleExists } = require("../model/check-articles");
const { selectComments } = require("../model/select-comments");

exports.getComments = (req, res, next) => {
  const { article_id } = req.params;
  Promise.all([selectComments(article_id), checkArticleExists(article_id)])

    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
