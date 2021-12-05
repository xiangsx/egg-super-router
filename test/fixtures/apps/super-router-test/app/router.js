'use strict';


module.exports = app => {
  const {router, controller} = app;
  app.srLoadRoutes(app);
  // router.get('/', controller.home.index);
};
