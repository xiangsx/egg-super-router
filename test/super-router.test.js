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

  it('should GET /limittest', () => {
    return app.httpRequest()
      .get('/limittest')
      .expect('{"code":0,"msg":"ok","sn":"","data":{"ok":true}}')
      .expect(200);
  });
  it('should GET /limittest', () => {
    return app.httpRequest()
      .get('/limittest')
      .expect('{"code":0,"msg":"ok","sn":"","data":{"ok":true}}')
      .expect(200);
  });
  it('should GET /limittest', () => {
    return app.httpRequest()
      .get('/limittest')
      .expect('{"code":0,"msg":"ok","sn":"","data":{"ok":true}}')
      .expect(200);
  });
  it('should GET /limittest', () => {
    return app.httpRequest()
      .get('/limittest')
      .expect('{"code":-10,"msg":"您的请求次数太多，请稍候重试","sn":""}')
      .expect(200);
  });
  it('should GET /limittest', () => {
    return app.httpRequest()
      .get('/limittest')
      .expect('{"code":-10,"msg":"您的请求次数太多，请稍候重试","sn":""}')
      .expect(200);
  });
});
