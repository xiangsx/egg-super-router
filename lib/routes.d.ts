import {Application} from 'egg';

export interface RouteInfo {
    method: EnumMethod
    params: object,
    access: number,
    url: string
    handle: Function
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

    addRoutes(routeList: RouteInfo[]): void
}
