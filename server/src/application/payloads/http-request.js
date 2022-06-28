module.exports = class HttpRequest {
  body;
  params;
  query;

  constructor(body, params, query) {
    this.body = body;
    this.params = params;
    this.query = query;
  }

  static fromExpress({ body, params, query }) {
    return new HttpRequest(body, params, query);
  }
};
