'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.wrap('hi, ' + this.app.plugins.superRouter.name)
  }
}

module.exports = HomeController;
