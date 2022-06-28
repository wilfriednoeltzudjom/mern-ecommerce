const { Types } = require('mongoose');

const deleteArticleUseCase = require('./delete-article.usecase')();
const getArticleUseCase = require('./get-article.usecase')();
const { ArticleFactory } = require('../../database/factories');
const { ResourceNotFoundError } = require('../../application/helpers/errors');

describe('Use case - delete article', () => {
  it('should fail if the article does not exist', async () => {
    await expect(deleteArticleUseCase.execute({ articleId: Types.ObjectId.createFromTime() })).to.be.eventually.rejectedWith(ResourceNotFoundError);
  });

  it('should succeed with an existing article', async () => {
    const persistedArticle = await ArticleFactory.persistArticle();

    const article = await expect(deleteArticleUseCase.execute({ articleId: persistedArticle.id })).to.be.fulfilled;
    expect(article.id).to.eql(persistedArticle.id);
    expect(getArticleUseCase.execute({ articleId: article.id })).to.be.eventually.rejectedWith(ResourceNotFoundError);
  });
});
