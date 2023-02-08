# egg-super-router

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-super-router.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-super-router
[travis-image]: https://img.shields.io/travis/eggjs/egg-super-router.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-super-router

[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-super-router.svg?style=flat-square

[codecov-url]: https://codecov.io/github/eggjs/egg-super-router?branch=master

[david-image]: https://img.shields.io/david/eggjs/egg-super-router.svg?style=flat-square

[david-url]: https://david-dm.org/eggjs/egg-super-router

[snyk-image]: https://snyk.io/test/npm/egg-super-router/badge.svg?style=flat-square

[snyk-url]: https://snyk.io/test/npm/egg-super-router

[download-image]: https://img.shields.io/npm/dm/egg-super-router.svg?style=flat-square

[download-url]: https://npmjs.org/package/egg-super-router

一款egg.js的插件，包含功能

- [x] 路由配置文件化
- [x] 路由权限配置校验
- [x] 路由参数校验
- [x] 路由返回结构统一
- [x] 统一错误码返回
- [ ] 路由缓存

## Install

```bash
$ npm i egg-super-router --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.superRouter = {
  enable: true,
  package: 'egg-super-router',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.superRouter = {
    access: {
        enable: true,
        path: 'lib/access'// 如果配置了此路径，插件会自动从lib/access目录下加载自定义access
    },
    error: {
        path: 'lib/error'// 自定义error
    }
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example
- 配置文件预览
```javascript

```

see [test/fixtures/apps/super-router-test](test/fixtures/apps/super-router-test) for details

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
