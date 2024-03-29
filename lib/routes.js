'use strict';
const joi = require('joi');
const fs = require('fs');
const path = require('path');
const j2s = require('joi-to-swagger');
const { genRateLimit } = require('../app/middleware/ratelimit');
const routeCheck = require('../app/middleware/routeCheck');
const paramsCheck = require('../app/middleware/paramsCheck');
const access = require('../app/middleware/access');
const routerSet = require('../app/middleware/routerSet');
const {EnumError} = require("./error");
const EnumMethod = {
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

function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  }
  if (mkdirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }

}

class SRRouter {
  constructor(app) {
    this.app = app;
    /**
         * @type {{proppatch: string, mkactivity: string, purge: string, delete: string, put: string, notify: string, head: string, mkcol: string, patch: string, trace: string, propfind: string, search: string, post: string, msearch: string, unsubscribe: string, get: string, merge: string, options: string, lock: string, copy: string, checkout: string, connect: string, move: string, unlock: string, resource: string, subscribe: string, report: string}}
         */
    this._resourceMethod = [];
    this.routeMap = new Map();
    this.swaggerDoc = {
      openapi: '3.1.0',
      swagger: '2.0',
      info: {
        title: 'API',
        description: 'API',
        version: '1.0.0',
      },
      //  the domain of the service
      //  host: 127.0.0.1:3457
      //  array of all schemes that your API supports
      schemes: [ 'https', 'http' ],
      //  will be prefixed to all paths
      basePath: '/api/',
      consumes: [ 'application/x-www-form-urlencoded' ],
      produces: [ 'application/json' ],
      paths: {},
    };
  }

  setSwaggerOpt(opt) {
    this.swaggerDoc = { ...this.swaggerDoc, ...opt };
  }

  saveSwaggerDoc() {
    const config = this.app.config.superRouter;
    if (config && config.swagger && config.swagger.enable) {
      const { docPath = './swagger/swagger.json' } = config.swagger;
      const dp = path.join(this.app.config.baseDir, docPath);
      mkdirsSync(path.dirname(dp));
      fs.writeFileSync(dp, JSON.stringify(this.swaggerDoc));
    }
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
      const methodSwagger = {
        [`${routeInfo.method}`]: {
          summary: routeInfo.summary || '',
          tags: routeInfo.tags || [],
          parameters: [{ in: 'body', schema: j2s(joi.object().keys(routeInfo.params)).swagger }],
          responses: routeInfo.responses,
        },
      };
      if (!this.swaggerDoc.paths[`${routeInfo.url}`]) {
        this.swaggerDoc.paths[`${routeInfo.url}`] = methodSwagger;
      } else {
        this.swaggerDoc.paths[`${routeInfo.url}`] = {
          ...this.swaggerDoc.paths[`${routeInfo.url}`],
          ...methodSwagger,
        };
      }
      this.app.logger.info(`init route [${routeInfo.method.toUpperCase()}] [${routeInfo.url}]`);
      this.routeMap.set(`${routeInfo.method}/${routeInfo.url}`, routeInfo);
      const middlewareList = [ routerSet(routeInfo), routeCheck(), access(), paramsCheck(), ...routeInfo.middleware];
      if (routeInfo.limit) {
        router[routeInfo.method](routeInfo.url, ...middlewareList, genRateLimit({
          keyGenerator: ctx => {
            if (ctx.session.user) {
              return `${routeInfo.url}:${ctx.session.user.uid}`;
            }
            return `${routeInfo.url}:${ctx.ip}`;
          },
          handler: ctx => {
            ctx.wrap(null, EnumError.ERR_LIMIT);
          },
          ...routeInfo.limit,
        }), routeInfo.handle);
      } else {
        router[routeInfo.method](routeInfo.url, ...middlewareList, routeInfo.handle);
      }
    }
    this.saveSwaggerDoc();
  }
}

module.exports = { SRRouter, EnumMethod };
