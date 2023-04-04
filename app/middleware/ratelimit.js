const { RateLimit, Stores } = require('koa2-ratelimit');

const Store = require('koa2-ratelimit/src/Store');

class RedisStore extends Store {
  /**
     * constructor
     * @param {*} config
     *
     * config is redis config
     */
  constructor(redis) {
    super();
    this.client = redis;
    this.client.on('error', err => console.log('Redis Client Error', err));
    this.client.connect();


  }

  /**
     * _hit
     * @access private
     * @param {*} key
     * @param {*} options
     * @param {*} weight
     */
  async _hit(key, options, weight) {

    let [ counter, dateEnd ] = await this.client.multi().get(key).ttl(key)
      .exec();

    if (counter === null) {
      counter = weight;
      dateEnd = Date.now() + options.interval;

      const seconds = Math.ceil(options.interval / 1000);
      await this.client.setEx(key, seconds.toString(), counter.toString());
    } else if (dateEnd === -2 || dateEnd === -1) {
      counter = counter + weight;
      dateEnd = Date.now() + options.interval;

      const seconds = Math.ceil(options.interval / 1000);
      await this.client.setEx(key, seconds.toString(), counter.toString());
    } else {
      counter = await this.client.incrBy(key, weight);
    }

    return {
      counter,
      dateEnd,
    };
  }

  /**
     * incr
     *
     * Override incr method from Store class
     * @param {*} key
     * @param {*} options
     * @param {*} weight
     */
  async incr(key, options, weight) {
    return await this._hit(key, options, weight);
  }

  /**
     * decrement
     *
     * Override decrement method from Store class
     * @param {*} key
     * @param {*} options
     * @param {*} weight
     */
  async decrement(key, options, weight) {
    await this.client.decrBy(key, weight);
  }

  /**
     * saveAbuse
     *
     * Override saveAbuse method from Store class
     */
  saveAbuse() {
  }
}

exports.RedisStore = RedisStore;

exports.genRateLimit = config => {
  return async function rateLimitMiddleware(ctx, next) {
    // 创建一个新的 RateLimit 实例
    const rateLimit = RateLimit.middleware(config);

    // 使用 koa2-ratelimit 中间件
    await rateLimit(ctx, next);
  };
};

exports.init = (options, app) => {
  const config = {
    store: new Stores.Memory(),
    handler: async ctx => {
      ctx.wrap(null, -10);
    },
  };
  if (app.redis) {
    config.store = new RedisStore(app.redis);
  }
  RateLimit.defaultOptions(config);
};
