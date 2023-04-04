export interface RateLimitConfig {
    driver?: any;
    db?: any;
    duration?: any;
    max?: any;
    id?: any;
    interval?: any;
    delayAfter?: any;
    timeWait?: any;
    message?: any;
    statusCode?: any;
    headers?: any;
    skipFailedRequests?: any;
    whitelist?: any;
    getUserIdFromKey?: any;
    prefixKeySeparator?: any;
    getUserId?: any;
    keyGenerator?: any;
    skip?: any;
    handler?: any;
    onLimitReached?: any;
    key?: any;
    ip?: any;
    user_id?: any;
    weight?: any;
    store?: any;
    MemoryStore?: any;
    SequelizeStore?: any;
}

export function init()

export function genRateLimit(config: RateLimitConfig): Function
