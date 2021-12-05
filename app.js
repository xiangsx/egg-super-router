// @ts-ignore
const path = require('path');
module.exports = (app) => {

    const {config} = app;
    let SRAccess;
    let SRError;
    if (config.superRouter
        && config.superRouter.access
        && config.superRouter.access.enable
        && app.config.superRouter.access.accessPaths) {
        const accessPath = path.join(app.config.baseDir, app.config.superRouter.access.accessPath);
        SRAccess = require(accessPath);
    } else {
        // 加载默认access类
        SRAccess = require('./lib/access');
    }
    if (config.superRouter
        && config.superRouter.error
        && config.superRouter.error.errorPath) {
        const errorPath = path.join(app.config.baseDir, app.config.superRouter.error.errorPath);
        SRError = require(errorPath);
    } else {
        // 加载默认error类
        SRError = require('./lib/error');
    }
    app.access = new SRAccess(app);
    app.error = new SRError(app);
    app.routes = {};
    app.srLoadRoutes = (outApp) => new app.loader.FileLoader({
        directory: path.join(app.config.baseDir, app.config.superRouter.routesPath || 'app/routes'),
        target: app.routes,
        inject: outApp
    }).load();
    app.config.coreMiddleware.push('routeCheck','access','paramsCheck');
}
