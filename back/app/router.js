'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/userinfo', controller.user.info); // 测试接口用

  router.get('/user/captcha', controller.user.captcha);// 获取图片验证码

  router.post('/user/register', controller.user.create);// 获取注册信息
};
