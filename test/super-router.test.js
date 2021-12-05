'use strict';

const mock = require('egg-mock');

describe('test/super-router.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/super-router-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /hello', () => {
    return app.httpRequest()
      .get('/hello')
      .expect('{"code":0,"msg":"ok","data":"hi, superRouter"}')
      .expect(200);
  });
  it('should GET /myaccess', () => {
    return app.httpRequest()
      .get('/myaccess')
      .expect('{"code":-4,"msg":"尚未登陆"}')
      .expect(401);
  });
  it('should GET /myerror', () => {
    return app.httpRequest()
      .get('/myerror')
      .expect('{"code":-12,"msg":"我的自定义错误"}')
      .expect(200);
  });
});
