const { factory } = require('fakingoose');

const { Article } = require('../models');
const factoryDefaultOptions = require('./_default-options');

const articleFactoryOptions = {
  uniqueKeyword: { skip: true },
};

function generateArticle(initData = {}, options = {}) {
  return factory(Article, { ...factoryDefaultOptions, ...articleFactoryOptions, ...options }).generate(initData);
}

async function persistArticle(initData = {}, options = {}) {
  const article = new Article(generateArticle(initData, options));

  return article.save();
}

module.exports = { generateArticle, persistArticle };
