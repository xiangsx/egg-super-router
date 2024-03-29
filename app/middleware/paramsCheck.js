'use strict';
const joi = require('joi');
const { EnumError } = require('../../lib/error');


module.exports = () => {
  return async function paramsCheck(ctx, next) {
    const { routeInfo, app } = ctx;
    let allowUnknown = true;
    if (app && app.config && app.config.superRouter && app.config.superRouter.params) {
      allowUnknown = app.config.superRouter.params.allowUnknown;
    }
    if (typeof routeInfo.allowUnknown !== 'undefined') {
      allowUnknown = routeInfo.allowUnknown;
    }
    try {
      const { params, method } = routeInfo;
      for (const field in params) {
        // 解析url中的数组类型
        if (method === 'GET' && params[field].type === 'array') {
          ctx.urlParams[field] = ctx.queries[field];
        }
      }
      ctx.urlParams = await joi.object(routeInfo.params).unknown(allowUnknown).validateAsync(ctx.urlParams);
    } catch (err) {
      ctx.logger.error('params check failed, err = ', err);
      ctx.wrap(null, EnumError.ERR_PARAMS, { msg: err.message });
      return;
    }
    await next();
  };
};
