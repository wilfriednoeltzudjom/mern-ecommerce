const createArticleUseCase = require('./create-article.usecase')();
const { ARTICLE_MESSAGES } = require('../../application/messages');
const { ArticleFactory } = require('../../database/factories');

describe('Use case - create article', () => {
  it('should fail if the article title is not provided', async () => {
    const articleData = ArticleFactory.generateArticle({}, { title: { skip: true } });

    await expect(createArticleUseCase.execute(articleData)).to.be.eventually.rejectedWith('title');
  });

  it('should fail if an article with the same title already exists', async () => {
    const persistedArticle = await ArticleFactory.persistArticle();

    await expect(createArticleUseCase.execute(persistedArticle)).to.be.eventually.rejectedWith(ARTICLE_MESSAGES.ARTICLE_ALREADY_EXISTS(persistedArticle));
  });

  it('should succeed if all requirements are fulfilled', async () => {
    const articleData = ArticleFactory.generateArticle();

    const article = await expect(createArticleUseCase.execute(articleData)).to.be.fulfilled;
    expect(article.id).to.not.be.undefined;
    expect(article.title).to.eql(articleData.title);
    expect(article.description).to.eql(articleData.description);
    expect(article.data.length).to.eql(articleData.data.length);
  });
});
