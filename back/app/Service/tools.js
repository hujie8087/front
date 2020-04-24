'use strict';
const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');

class ToolsService extends Service {
  captcha() {
    const capt = svgCaptcha.create({
      fontSize: 50,
      height: 40,
      width: 90,
      noise: 2,
    });
    return capt;
  }
}


module.exports = ToolsService;
