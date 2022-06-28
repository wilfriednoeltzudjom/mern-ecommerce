const { Article } = require('../../database/models');

module.exports = function buildGetArticles() {
  async function execute() {
    return Article.find({}).sort({ createdAt: -1 });
  }

  return { execute };
};
