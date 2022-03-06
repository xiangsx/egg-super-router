'use strict';

const Controller = require('egg').Controller;

class TestRestful extends Controller {
  async create() {
    this.ctx.wrap('hi, ' + this.app.plugins.superRouter.name);
  }

  async update() {
    this.ctx.session = {};
    this.ctx.session.user = { access: this.app.access.ACC_LOGIN };
    this.ctx.wrap();
  }

  async delete() {
    this.ctx.wrap(null, this.app.error.ERR_MY_ERROR);
  }
}

module.exports = TestRestful;
