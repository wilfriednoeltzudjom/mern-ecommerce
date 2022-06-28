const { Article } = require('../../database/models');
const { ResourceNotFoundError } = require('../../application/helpers/errors');
const { ARTICLE_MESSAGES } = require('../../application/messages');

module.exports = function buildGetArticle() {
  async function execute({ articleId } = {}) {
    const article = await Article.findById(articleId);
    if (!article) throw new ResourceNotFoundError(ARTICLE_MESSAGES.ARTICLE_NOT_FOUND({ articleId }));

    return article;
  }

  return { execute };
};
