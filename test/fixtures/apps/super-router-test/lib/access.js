'use strict';

const SRAccessBase = require('../../../../../lib/access').SRAccess;

class MyAccess extends SRAccessBase {
  constructor(props) {
    super(props);
    this.ACC_MY_ACC = 0b100;
    this.ACC_SELECT = 0b1000;
    this.AccessMap.set(this.ACC_SELECT, { msg: '查询权限' });
  }

}

module.exports = { SRAccess: MyAccess };
