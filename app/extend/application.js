'use strict';

const SRRouter = require('../../lib/routes');
const path = require('path');

const ROUTE_DEFINE = Symbol('Application#routeDefine');
const ACCESS = Symbol('Application#Access');
const ERROR = Symbol('Application#Error');

module.exports = {
  srLoadRoutes: outApp => new this.loader.FileLoader({
    directory: path.join(this.config.baseDir, this.config.superRouter.routesPath || 'app/routes'),
    target: this.routes,
    inject: outApp,
  }).load(),
  get srRouter() {
    if (!this[ROUTE_DEFINE]) {
      this[ROUTE_DEFINE] = new SRRouter(this);
    }
    return this[ROUTE_DEFINE];
  },

  get access() {
    return this[ACCESS];
  },

  /**
     * @param {SRAccess} access 权限
     */
  set access(access) {
    this[ACCESS] = access;
  },

  get error() {
    return this[ERROR];
  },

  /**
     * @param {SRError} error 错误
     */
  set error(error) {
    this[ERROR] = error;
  },
};
