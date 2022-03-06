'use strict';

const SRAccessBase = require('../../../../../lib/access');

class MyAccess extends SRAccessBase {
  constructor(props) {
    super(props);
    this.ACC_MY_ACC = 0b100;
    this.ACC_SELECT = 0b1000;
    this.ACC_CREATE = 0b10000;
    this.ACC_UPDATE = 0b100000;
    this.ACC_DELETE = 0b1000000;
  }

}

module.exports = MyAccess;
