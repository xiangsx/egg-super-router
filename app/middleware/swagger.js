'use strict';

const { koaSwagger } = require('koa2-swagger-ui');
module.exports = (options, app) => {
  return koaSwagger({ routePrefix: '/swagger', swaggerOptions: app.srRouter.getSwaggerDoc() });
};
