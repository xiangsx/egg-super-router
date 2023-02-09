'use strict';

const { EnumError, EnumAccess } = require('../../../../../../index');
const Controller = require('egg').Controller;

class TestRestful extends Controller {
  async create() {
    this.ctx.wrap('hi, ' + this.app.plugins.superRouter.name);
  }

  async update() {
    this.ctx.session = {};
    this.ctx.session.user = { access: EnumAccess.ACC_LOGIN };
    this.ctx.wrap();
  }

  async delete() {
    this.ctx.wrap(null, EnumError.ERR_MY_ERROR);
  }
}

module.exports = TestRestful;
