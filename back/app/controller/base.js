'use strict';
// controller 的父类，提供一些公用基类

const Controller = require('egg').Controller;

class BaseController extends Controller {
    success(data) {
        // 提供成功数据
        this.ctx.body = {
            code: 1,
            data,
        };
    }
    message(msg) {
        // 提供成功消息
        this.ctx.body = {
            code: 0,
            message: msg,
        };
    }
    error(msg, code = -1) {
        // 返回错误信息
        this.ctx.body = {
            code,
            message: msg,
        };
    }
}

module.exports = BaseController;