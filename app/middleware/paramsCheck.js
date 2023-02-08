'use strict';
const joi = require('joi');


module.exports = () => {
  return async function paramsCheck(ctx, next) {
    const { routeInfo, app } = ctx;
    try {
      const { params, method } = routeInfo;
      for (const field in params) {
        // 解析url中的数组类型
        if (method === 'GET' && params[field].type === 'array') {
          ctx.urlParams[field] = ctx.queries[field];
        }
      }
      ctx.urlParams = await joi.object(routeInfo.params).unknown().validateAsync(ctx.urlParams);
    } catch (err) {
      console.error('params check failed, err = ', err);
      ctx.wrap(err.message, app.error.ERR_PARAMS);
      return;
    }
    await next();
  };
};
