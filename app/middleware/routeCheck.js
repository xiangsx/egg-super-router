'use strict';

const { EnumError } = require('../../lib/error');
module.exports = () => {
  return async (ctx, next) => {
    // 访问接口未定义 返错
    if (!ctx.routeInfo) {
      ctx.logger.debug(`[${ctx.ip} ${ctx.method} ${ctx.path}] ${JSON.stringify(ctx.urlParams)
      } route define not existed`);
      ctx.wrap(null, EnumError.ERR_ROUTE);
      return;
    }
    ctx.logger.debug(`[request] [${ctx.ip} ${ctx.method} ${ctx.path}] ${JSON.stringify(ctx.urlParams)}`);
    await next();
  };
};
