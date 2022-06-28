const { Article } = require('../../database/models');
const buildGetArticle = require('./get-article.usecase');

module.exports = function buildDeleteArticle() {
  const getArticleUseCase = buildGetArticle();

  async function execute({ articleId } = {}) {
    const article = await getArticleUseCase.execute({ articleId });
    await Article.deleteOne({ _id: article.id });

    return article;
  }

  return { execute };
};
