module.exports = Object.freeze({
  ARTICLE_CREATED: 'Votre article a bien été enregistré.',
  ARTICLE_UPDATED: 'Votre article a bien été mis à jour.',
  ARTICLE_DELETED({ title }) {
    return `L'article ${title} a bien été supprimé.`;
  },
  ARTICLE_NOT_FOUND({ articleId }) {
    return `Aucun article trouvé pour l'identifiant ${articleId}.`;
  },
  ARTICLE_ALREADY_EXISTS({ title }) {
    return `Un article avec le nom ${title} existe déjà.`;
  },
});
