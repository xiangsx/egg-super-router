'use strict';

const { EnumError, EnumAccess } = require('../../../../../../index');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.wrap('hi, ' + this.app.plugins.superRouter.name);
  }

  async myaccess() {
    this.ctx.session = {};
    this.ctx.session.user = { access: EnumAccess.ACC_LOGIN };
    this.ctx.wrap();
  }

  async myerror() {
    this.ctx.wrap(null, EnumError.ERR_MY_ERROR);
  }

  async limittest() {
    this.ctx.wrap({ ok: true });
  }

  async testparams() {
    this.ctx.wrap({ params: this.ctx.params });
  }
}

module.exports = HomeController;
