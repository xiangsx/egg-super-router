'use strict';

const ROUTE_INFO = Symbol('Context#ROUTE_INFO');
const USER_ACCESS = Symbol('Context#USER_ACCESS');

module.exports = {
  get routeInfo() {
    if (!this[ROUTE_INFO]) {
      const { app } = this;
      const { srRouter } = app;
      // @ts-ignore
      this[ROUTE_INFO] = srRouter.getRouteInfo(this.method.toLowerCase(), this.path);
    }
    return this[ROUTE_INFO];
  },
  hasLogin() {
    return !!(this.session && this.session.user); // eslint-disable-line
  },
  get userAccess() {
    if (!this[USER_ACCESS]) {
      this[USER_ACCESS] = this.session && this.session.user && this.session.user.access;
    }
    return this[USER_ACCESS];
  },
  wrap(data, errCode = 0, opts = {}) {
    if (this.reqEnd) {
      return;
    }
    const { status, msg } = opts;
    const errInfo = this.app.error.getError(errCode);
    const sendData = {
      code: errInfo.code,
      msg: msg || errInfo.msg,
      sn: this.sn,
      data: errCode === 0 ? data : undefined,
    };
    this.status = status || errInfo.status;
    this.logger.debug(`[response] [${new Date().getTime() - this.starttime} ms] ${JSON.stringify(sendData)}`);
    this.body = sendData;
    this.reqEnd = true;
  },
};
