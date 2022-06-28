const buildGetArticle = require('./get-article.usecase');

const articleHelper = require('../../application/helpers/article.helper');

module.exports = function buildUpdateArticle() {
  const getArticleUseCase = buildGetArticle();

  async function execute({ articleId, ...articleData } = {}) {
    const article = await getArticleUseCase.execute({ articleId });
    Object.assign(article, articleData);
    await article.validate();
    if (articleData.title) await articleHelper.ensureArticleDoesNotExist(article);

    return article.save();
  }

  return { execute };
};
