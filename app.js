'use strict';
const path = require('path');
const ratelimit = require('./app/middleware/ratelimit');

module.exports = app => {

  const { config } = app;
  let SRAccess;
  let SRError;
  if (config.superRouter
        && config.superRouter.access
        && config.superRouter.access.path) {
    const accessPath = path.join(config.baseDir, config.superRouter.access.path);
    SRAccess = require(accessPath).SRAccess;
  } else {
    // 加载默认access类
    SRAccess = require('./lib/access').SRAccess;
  }
  if (config.superRouter
        && config.superRouter.error
        && config.superRouter.error.path) {
    const errorPath = path.join(config.baseDir, config.superRouter.error.path);
    SRError = require(errorPath).SRError;
  } else {
    // 加载默认error类
    SRError = require('./lib/error').SRError;
  }
  app.access = new SRAccess(app);
  app.error = new SRError(app);
  if (config && config.superRouter && config.superRouter.rateLimit && config.superRouter.rateLimit.enable) {
    ratelimit.init(config.superRouter.rateLimit, app);
  }
  app.routes = {};
  app.srLoadRoutes = outApp => new app.loader.FileLoader({
    directory: path.join(app.config.baseDir, app.config.superRouter.routesPath || 'app/routes'),
    target: app.routes,
    inject: outApp,
  }).load();
  if (config.superRouter && config.superRouter.swagger) {
    app.srRouter.setSwaggerOpt(config.superRouter.swagger.options);
  }
  app.srRouter.setSwaggerOpt();
  // app.config.coreMiddleware.push('routeCheck', 'access', 'paramsCheck');
};
