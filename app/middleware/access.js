'use strict';


const { EnumError } = require('../../lib/error');
module.exports = () => {
  return async (ctx, next) => {
    // 访问接口未定义 返错
    const { routeInfo, app } = ctx;
    if (routeInfo.access) {
      if (!ctx.hasLogin()) {
        ctx.wrap(null, EnumError.ERR_NOT_LOGIN);
        return;
      }
      const [ ok, msg ] = app.access.checkAccess(ctx.userAccess, routeInfo.access, ctx);
      if (!ok) {
        ctx.wrap(null, EnumError.ERR_ACCESS, { msg });
        return;
      }
    }
    await next();
  };
};
