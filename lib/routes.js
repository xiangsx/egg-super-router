'use strict';

class SRRouter {

  constructor(app) {
    this.app = app;
    /**
         * @type {{proppatch: string, mkactivity: string, purge: string, delete: string, put: string, notify: string, head: string, mkcol: string, patch: string, trace: string, propfind: string, search: string, post: string, msearch: string, unsubscribe: string, get: string, merge: string, options: string, lock: string, copy: string, checkout: string, connect: string, move: string, unlock: string, resource: string, subscribe: string, report: string}}
         */
    this.EnumMethod = {
      // RESTful api
      resource: 'resource',

      get: 'get',
      post: 'post',
      put: 'put',
      delete: 'delete',
      head: 'head',
      options: 'options',
      trace: 'trace',
      copy: 'copy',
      lock: 'lock',
      mkcol: 'mkcol',
      move: 'move',
      purge: 'purge',
      propfind: 'propfind',
      proppatch: 'proppatch',
      unlock: 'unlock',
      report: 'report',
      mkactivity: 'mkactivity',
      checkout: 'checkout',
      merge: 'merge',
      msearch: 'msearch',
      notify: 'notify',
      subscribe: 'subscribe',
      unsubscribe: 'unsubscribe',
      patch: 'patch',
      search: 'search',
      connect: 'connect',
    };
    this._resourceMethod = [];
    this.routeMap = new Map();
  }

  /**
     *
     * @param {Method} method 请求方法
     * @param {string} url url
     * @return {RouteInfo} 路由配置信息
     */
  getRouteInfo(method, url) {
    return this.routeMap.get(`${method}/${url}`);
  }

  /**
     * @param {RouteInfo[]} routeList 路由配置列表
     */
  addRoutes(routeList) {
    const { router } = this.app;

    for (const routeInfo of routeList) {
      console.log(`init route [${routeInfo.method.toUpperCase()}] [${routeInfo.url}]`);
      this.routeMap.set(`${routeInfo.method}/${routeInfo.url}`, routeInfo);
      router[routeInfo.method](routeInfo.url, routeInfo.handle);
    }
  }
}

module.exports = SRRouter;
