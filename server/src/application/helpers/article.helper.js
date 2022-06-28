const { Article } = require('../../database/models');
const { ARTICLE_MESSAGES } = require('../messages');
const { BadRequestError } = require('./errors');

/**
 * Ensure that there is no article with the same title
 * @param {Object} article
 */
async function ensureArticleDoesNotExist(article) {
  const foundArticlesCount = await Article.countDocuments({ uniqueKeyword: article.uniqueKeyword });
  if (foundArticlesCount > 0) throw new BadRequestError(ARTICLE_MESSAGES.ARTICLE_ALREADY_EXISTS(article));
}

module.exports = { ensureArticleDoesNotExist };
