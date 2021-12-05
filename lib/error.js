class SRErrorBase {
    SUCCESS = 0
    ERR_UNKNOWN = -1
    ERR_PARAMS = -2
    ERR_ROUTE = -3
    ERR_NOT_LOGIN = -4
    ERR_ACCESS = -5
    ERR_PASSWORD = -6
    ERR_USER_NOT_EXIST = -7
    ERR_EVENT = -8
    ERR_DB = -9
    ERR_DOWNLOAD_FAILED = -10
    ERR_DB_DUPLICATE = -11

    /**
     * @typedef {{msg:string,status:number,code?:number}} ErrorInfo
     */
    constructor() {
        this.ErrorMap = new Map()
        this.ErrorMap.set(this.SUCCESS, {msg: 'ok', status: 200});
        this.ErrorMap.set(this.ERR_UNKNOWN, {msg: '服务器错误', status: 500});
        this.ErrorMap.set(this.ERR_PARAMS, {msg: '参数校验错误', status: 400});
        this.ErrorMap.set(this.ERR_ROUTE, {msg: '访问的接口不存在', status: 404});
        this.ErrorMap.set(this.ERR_NOT_LOGIN, {msg: '尚未登陆', status: 401});
        this.ErrorMap.set(this.ERR_ACCESS, {msg: '当前用户无此接口权限', status: 403});
        this.ErrorMap.set(this.ERR_PASSWORD, {msg: '密码错误', status: 401});
        this.ErrorMap.set(this.ERR_USER_NOT_EXIST, {msg: '用户不存在', status: 401});
        this.ErrorMap.set(this.ERR_DB, {msg: '数据库出错', status: 200});
        this.ErrorMap.set(this.ERR_DOWNLOAD_FAILED, {msg: '下载文件失败', status: 200});
        this.ErrorMap.set(this.ERR_DB_DUPLICATE, {msg: '数据重复了，请检查数据', status: 200});
    }

    /**
     * @param code
     * @param {ErrorInfo} options
     */
    addError(code, options) {
        this.ErrorMap.set(code, options);
    }

    getError(code) {
        return {
            code: code,
            ...(this.ErrorMap.get(code) || {code: this.ERR_UNKNOWN, msg: '服务器错误', status: 500})
        }
    }
}

module.exports = SRErrorBase;
