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

  it('should GET /123/testparams', () => {
    return app.httpRequest()
      .get('/123/testparams')
      .expect('{"code":0,"msg":"ok","sn":"","data":{"params":{"param":"123"}}}')
      .expect(200);
  });
});
