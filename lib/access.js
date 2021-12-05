'use strict';

class SRAccessBase {


  constructor() {
    this.ACC_NONE = 0b0;
    this.ACC_LOGIN = 0b1;
    this.ACC_USER_MANAGE = 0b10;
    this.ACC_SUPER_ADMIN = 0xFFFFFF;
    this.AccessMap = new Map();
    this.AccessMap.set(this.ACC_NONE, { msg: '无' });
    this.AccessMap.set(this.ACC_LOGIN, { msg: '登录' });
    this.AccessMap.set(this.ACC_USER_MANAGE, { msg: '用户管理' });
    this.AccessMap.set(this.ACC_SUPER_ADMIN, { msg: '超级管理员' });
  }

  /**
     * 生成用户的权限
     * @param {[number]} accessList 权限列表，例如[EnumAccessType.CONTENT_EXPORT,EnumAccessType.LOGIN],
     * 也可以传入[用户现在的权限,需要增加的权限]
     * @return {number} 用户的总权限
     */
  generateAccess(accessList) {
    let allAccess = this.ACC_NONE;
    for (const access of accessList) {
      // eslint-disable-next-line no-bitwise
      allAccess |= access;
    }
    return allAccess;
  }

  checkAccess(userAccess, targetAccess) {
    // eslint-disable-next-line no-bitwise
    return (userAccess & targetAccess) === targetAccess;
  }

  getAccessInfo(access) {
    return { code: access, ...(this.AccessMap.get(access) || { msg: '未知权限' }) };
  }

  /**
     * 移除用户权限
     * @param {number} userAccess 用户当前权限
     * @param {number} targetAccess 需要移除的权限
     * @return {number|*} 移除之后的用户权限
     */
  removeAccess(userAccess, targetAccess) {
    if (this.checkAccess(userAccess, targetAccess)) {
      return userAccess - targetAccess;
    }
    return userAccess;
  }
}
module.exports = SRAccessBase;
