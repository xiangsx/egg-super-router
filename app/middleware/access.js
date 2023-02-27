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
      if (!app.access.checkAccess(ctx.userAccess, routeInfo.access, ctx)) {
        ctx.wrap(`访问被拒绝，需要${app.access.getAccessInfo(routeInfo.access).msg}权限`, EnumError.ERR_ACCESS);
        return;
      }
    }
    await next();
  };
};
