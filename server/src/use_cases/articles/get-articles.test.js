const getArticlesUseCase = require('./get-articles.usecase')();
const { ArticleFactory } = require('../../database/factories');

describe('Use case - get articles', () => {
  it('should return an empty array if there is no article', async () => {
    const articles = await expect(getArticlesUseCase.execute()).to.be.fulfilled;
    expect(articles).to.be.empty;
  });

  it('should return all existing articles', async () => {
    await Promise.all(Array(5).fill().map(ArticleFactory.persistArticle));

    const articles = await expect(getArticlesUseCase.execute()).to.be.fulfilled;
    expect(articles).to.have.lengthOf(5);
  });
});
