'use strict';

const SRErrorBase = require('../../../../../lib/error');

class MyError extends SRErrorBase {
  constructor(props) {
    super(props);
    this.ERR_MY_ERROR = -12;
    this.addError(this.ERR_MY_ERROR, { msg: '我的自定义错误', status: 200 });
  }
}

module.exports = MyError;
