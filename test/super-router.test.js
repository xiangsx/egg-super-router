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

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, superRouter')
      .expect(200);
  });
});
