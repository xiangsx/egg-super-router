'use strict';

// 默认的权限管理类
exports.SRAccess = require('./lib/access').SRAccess;

// 默认的错误管理类
exports.SRError = require('./lib/error').SRError;

exports.EnumError = require('./lib/error').EnumError;
exports.EnumAccess = require('./lib/access').EnumAccess;
exports.EnumMethod = require('./lib/routes').EnumMethod;
