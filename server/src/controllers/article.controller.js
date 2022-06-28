const buildCreateArticleUseCase = require('../use_cases/articles/create-article.usecase');
const buildGetArticlesUseCase = require('../use_cases/articles/get-articles.usecase');
const buildUpdateArticleUseCase = require('../use_cases/articles/update-article.usecase');
const buildDeleteArticleUseCase = require('../use_cases/articles/delete-article.usecase');
const { ARTICLE_MESSAGES } = require('../application/messages');
const HttpResponse = require('../application/payloads/http-response');

module.exports = function buildArticleController(dependencies) {
  const createArticleUseCase = buildCreateArticleUseCase(dependencies);
  const getArticlesUseCase = buildGetArticlesUseCase(dependencies);
  const updateArticleUseCase = buildUpdateArticleUseCase(dependencies);
  const deleteArticleUseCase = buildDeleteArticleUseCase(dependencies);

  async function createArticle(request) {
    const article = await createArticleUseCase.execute(request.body);

    return HttpResponse.created({ message: ARTICLE_MESSAGES.ARTICLE_CREATED, data: article });
  }

  async function getArticles() {
    const articles = await getArticlesUseCase.execute();

    return HttpResponse.succeeded({ data: articles });
  }

  async function updateArticle(request) {
    const article = await updateArticleUseCase.execute({ ...request.params, ...request.body });

    return HttpResponse.succeeded({ message: ARTICLE_MESSAGES.ARTICLE_UPDATED, data: article });
  }

  async function deleteArticle(request) {
    const article = await deleteArticleUseCase.execute(request.params);

    return HttpResponse.succeeded({ message: ARTICLE_MESSAGES.ARTICLE_DELETED(article), data: article });
  }

  return { createArticle, getArticles, updateArticle, deleteArticle };
};
