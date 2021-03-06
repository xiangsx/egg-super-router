'use strict';

const joi = require('joi');

module.exports = app => {
  const { access, srRouter } = app;
  const { EnumMethod } = srRouter;

  srRouter.addRoutes([
    {
      url: '/hello',
      params: {
        name: joi.string().required(),
        age: joi.number().min(0).max(10)
          .required(),
      },
      method: EnumMethod.get,
      access: access.ACC_NONE,
      handle: app.controller.home.index,
    }, {
      url: '/myaccess',
      params: {},
      method: EnumMethod.get,
      access: access.ACC_MY_ACC,
      handle: app.controller.home.myaccess,
    }, {
      url: '/myerror',
      params: {},
      method: EnumMethod.get,
      handle: app.controller.home.myerror,
    },
  ]);
};
