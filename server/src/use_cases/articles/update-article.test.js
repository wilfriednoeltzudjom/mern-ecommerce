const { Types } = require('mongoose');

const updateArticleUseCase = require('./update-article.usecase')();
const { ArticleFactory } = require('../../database/factories');
const { ResourceNotFoundError } = require('../../application/helpers/errors');
const { ARTICLE_MESSAGES } = require('../../application/messages');

describe('Use case - update article', () => {
  it('should fail if the article does not exist', async () => {
    await expect(updateArticleUseCase.execute({ articleId: Types.ObjectId.createFromTime() })).to.be.eventually.rejectedWith(ResourceNotFoundError);
  });

  it('should fail when trying to remove the article title', async () => {
    const persistedArticle = await ArticleFactory.persistArticle();

    await expect(updateArticleUseCase.execute({ articleId: persistedArticle.id, title: '' })).to.be.eventually.rejectedWith('title');
  });

  it('should fail if an article with the same title already exists', async () => {
    const persistedArticleOne = await ArticleFactory.persistArticle();
    const persistedArticleTwo = await ArticleFactory.persistArticle();

    await expect(updateArticleUseCase.execute({ articleId: persistedArticleTwo.id, title: persistedArticleOne.title })).to.be.eventually.rejectedWith(
      ARTICLE_MESSAGES.ARTICLE_ALREADY_EXISTS(persistedArticleOne)
    );
  });

  it('should succeed if all requirements are fulfilled', async () => {
    const persistedArticle = await ArticleFactory.persistArticle();
    const articleData = ArticleFactory.generateArticle();

    const article = await expect(updateArticleUseCase.execute({ articleId: persistedArticle.id, ...articleData })).to.be.fulfilled;
    expect(article.id).to.eql(persistedArticle.id);
    expect(article.title).to.eql(articleData.title);
    expect(article.description).to.eql(articleData.description);
    expect(article.data.length).to.eql(articleData.data.length);
  });
});
