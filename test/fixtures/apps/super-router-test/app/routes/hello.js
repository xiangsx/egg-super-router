const joi = require('joi');

module.exports = app => {
    const {access, controller, srRouter} = app;

    srRouter.addRoutes([
        {
            url: '/hello',
            params: {
                name: joi.string().required(),
                age: joi.number().min(0).max(10).required()
            },
            method: srRouter.EnumMethod.get,
            access: access.ACC_NONE,
            handle: app.controller.home.index
        }
    ]);
};
