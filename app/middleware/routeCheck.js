'use strict';

module.exports = () => {
  return async (ctx, next) => {
    // 访问接口未定义 返错
    if (!ctx.routeInfo) {
      ctx.logger.debug(`[${ctx.ip} ${ctx.method} ${ctx.path}] ${JSON.stringify(ctx.urlParams)
      } route define not existed`);
      ctx.wrap(null, ctx.app.error.ERR_ROUTE);
      return;
    }
    ctx.logger.debug(`[request] [${ctx.ip} ${ctx.method} ${ctx.path}] ${JSON.stringify(ctx.urlParams)}`);
    await next();
  };
};
