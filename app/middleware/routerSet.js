'use strict';

module.exports = routeInfo => {
  return async function routerSet(ctx, next) {
    ctx.routeInfo = routeInfo;
    await next();
  };
};
