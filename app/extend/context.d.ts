import {Context} from 'egg';
import {Method, RouteInfo} from "../../lib/routes";

export interface wrapOpts {
    status: number,
    msg: string,
}

export default class SRContext extends Context {
    reqEnd: boolean
    method: Method
    routeInfo: RouteInfo
    userAccess: number
    wrap: (data: any, errCode = Error | Number, opts) => {}
};
