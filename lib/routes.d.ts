import {Application, Controller} from 'egg';
import {RateLimitConfig} from "../app/middleware/ratelimit";

export interface ResourceParams {
    get: object;
    post: object;
    put: object;
    delete: object;
}

export type SRParams = ResourceParams | object;

export interface ResourceHandle {
    get: Function;
    post: Function;
    put: Function;
    delete: Function;
}

export interface RouteInfo {
    method: EnumMethod;
    params: object;
    paramsDescriptions: object;
    access: number;
    url: string;
    handle: ResourceHandle | Function;
    summary: string;
    tags: string[];
    responses: object;
    limit: RateLimitConfig;
    middleware: Function[]
}

interface RESTfulCustomConfig {
    params?: object
    access?: number
    handle?: Function
}

export interface RouteConfig {
    method: EnumMethod;
    params?: object;
    access?: number;
    handle?: Function | Controller;
    get?: RESTfulCustomConfig;
    post?: RESTfulCustomConfig;
    put?: RESTfulCustomConfig;
    delete?: RESTfulCustomConfig;
}

export enum EnumMethod {
    resource = "resource",

    get = 'get',
    post = 'post',
    put = 'put',
    delete = 'delete',
    head = 'head',
    options = 'options',
    trace = 'trace',
    copy = 'copy',
    lock = 'lock',
    mkcol = 'mkcol',
    move = 'move',
    purge = 'purge',
    propfind = 'propfind',
    proppatch = 'proppatch',
    unlock = 'unlock',
    report = 'report',
    mkactivity = 'mkactivity',
    checkout = 'checkout',
    merge = 'merge',
    msearch = 'msearch',
    notify = 'notify',
    subscribe = 'subscribe',
    unsubscribe = 'unsubscribe',
    patch = 'patch',
    search = 'search',
    connect = 'connect',
}

type Method = EnumMethod | string;

export default class SRRouter {
    constructor(app: Application) {
    }

    getRouteInfo(method: Method, url: string): RouteInfo

    addRoutes(routeList: RouteConfig[]): void
}
