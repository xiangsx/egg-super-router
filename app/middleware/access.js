'use strict';


module.exports = () => {
  return async (ctx, next) => {
    // 访问接口未定义 返错
    const { routeInfo, app } = ctx;
    if (Number.isInteger(routeInfo.access) && routeInfo.access) {
      if (!ctx.hasLogin()) {
        ctx.wrap(null, app.error.ERR_NOT_LOGIN);
        return;
      }
      if (!app.access.checkAccess(ctx.userAccess, routeInfo.access)) {
        ctx.wrap(`访问被拒绝，需要${app.access.getAccessInfo(routeInfo.access).msg}权限`, app.error.ERR_ACCESS);
        return;
      }
    }
    await next();
  };
};
