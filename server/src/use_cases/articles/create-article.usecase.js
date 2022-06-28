const { Article } = require('../../database/models');
const articleHelper = require('../../application/helpers/article.helper');

module.exports = function buildCreateArticle() {
  async function execute(articleData = {}) {
    const article = new Article(articleData);
    await article.validate();
    await articleHelper.ensureArticleDoesNotExist(article);

    return article.save();
  }

  return { execute };
};
