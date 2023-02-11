'use strict';

const { koaSwagger } = require('koa2-swagger-ui');
module.exports = (options, app) => {
  let docUrl = '';
  if (app.config.superRouter && app.config.superRouter.swagger) {
    docUrl = app.config.superRouter.swagger.url;
  }
  return koaSwagger({ routePrefix: '/swagger', swaggerOptions: { url: docUrl } });
};
