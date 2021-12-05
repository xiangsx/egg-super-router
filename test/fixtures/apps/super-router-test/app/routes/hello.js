'use strict';

const joi = require('joi');

module.exports = app => {
  const { access, srRouter } = app;

  srRouter.addRoutes([
    {
      url: '/hello',
      params: {
        name: joi.string().required(),
        age: joi.number().min(0).max(10)
          .required(),
      },
      method: srRouter.EnumMethod.get,
      access: access.ACC_NONE,
      handle: app.controller.home.index,
    }, {
      url: '/myaccess',
      params: {
      },
      method: srRouter.EnumMethod.get,
      access: access.ACC_MY_ACCESS,
      handle: app.controller.home.myaccess,
    }, {
      url: '/myerror',
      params: {
      },
      method: srRouter.EnumMethod.get,
      handle: app.controller.home.myerror,
    },
  ]);
};
