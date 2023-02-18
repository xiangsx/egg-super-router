'use strict';

/**
 * egg-super-router default config
 * @member Config#superRouter
 * @property {String} SOME_KEY - some description
 */
exports.superRouter = {
  access: {
    enable: true,
    // accessPath: 'lib/access.js',
  },
  error: {
    // errorPath: 'lib/error.js'
  },
  swagger: {
    enable: true,
    docPath: './app/public/swagger/swagger.json',
    docUrl: 'localhost:7001/swagger/swagger.json',
  },
  params: {
    allowUnknown: true,
  },
};
