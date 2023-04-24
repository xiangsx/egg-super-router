'use strict';


const { EnumError } = require('../../lib/error');
module.exports = () => {
  return async (ctx, next) => {
    // 访问接口未定义 返错
    const { routeInfo, app } = ctx;
    if (routeInfo.access) {
      if (typeof routeInfo.access !== 'function' && !ctx.hasLogin()) {
        ctx.wrap(null, EnumError.ERR_NOT_LOGIN);
        return;
      }
      const [ ok, msg, status ] = app.access.checkAccess(ctx.userAccess, routeInfo.access, ctx);
      if (!ok) {
        ctx.wrap(null, EnumError.ERR_ACCESS, { msg, status });
        return;
      }
    }
    await next();
  };
};
