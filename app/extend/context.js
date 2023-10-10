'use strict';

const ROUTE_INFO = Symbol('Context#ROUTE_INFO');
const USER_ACCESS = Symbol('Context#USER_ACCESS');
const PARAMS = Symbol('Context#PARAMS');
const SEQUENCE_NUMBER = Symbol('Context#SEQUENCE_NUMBER');

module.exports = {
  get urlParams() {
    if (!this[PARAMS]) {
      // 实际情况肯定更复杂
      this[PARAMS] = { ...this.query, ...this.request.body };
    }
    return this[PARAMS];
  },
  set urlParams(v) {
    this[PARAMS] = v;
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
  get sn() {
    if (!this[SEQUENCE_NUMBER]) {
      this[SEQUENCE_NUMBER] = this.get('X-Request-Id');
    }
    return this[SEQUENCE_NUMBER];
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
