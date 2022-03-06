module.exports = app => {
  const { access, srRouter } = app;
  const { EnumMethod } = srRouter;
  srRouter.addRoutes([
    // {
    //   url: '/test-restful',
    //   method: EnumMethod.resource,
    //   get: {
    //     params: {},
    //     access: app.access.ACC_SELECT,
    //     handle: app.controller.testRestful,
    //   },
    // },
  ]);
};
