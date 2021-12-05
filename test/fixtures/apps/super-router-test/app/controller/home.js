'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.wrap('hi, ' + this.app.plugins.superRouter.name)
  }

  async myaccess() {
    this.ctx.session = {};
    this.ctx.session.user = {access: this.app.access.ACC_LOGIN};
    this.ctx.wrap();
  }

  async myerror() {
    this.ctx.wrap(null, this.app.error.ERR_MY_ERROR);
  }
}

module.exports = HomeController;
