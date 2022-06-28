const express = require('express');

const HttpRequest = require('../../../../application/payloads/http-request');
const { ArticleController } = require('../../../../controllers');

const router = express.Router();

router.post('/', (req, res, next) => {
  ArticleController.createArticle(HttpRequest.fromExpress(req))
    .then((response) => {
      res.status(response.status).json(response.toJSON());
    })
    .catch((error) => next(error));
});

router.get('/', (_req, res, next) => {
  ArticleController.getArticles()
    .then((response) => {
      res.status(response.status).json(response.toJSON());
    })
    .catch((error) => next(error));
});

router.put('/:articleId', (req, res, next) => {
  ArticleController.updateArticle(HttpRequest.fromExpress(req))
    .then((response) => {
      res.status(response.status).json(response.toJSON());
    })
    .catch((error) => next(error));
});

router.delete('/:articleId', (req, res, next) => {
  ArticleController.deleteArticle(HttpRequest.fromExpress(req))
    .then((response) => {
      res.status(response.status).json(response.toJSON());
    })
    .catch((error) => next(error));
});

module.exports = router;
