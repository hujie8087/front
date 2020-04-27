'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    const jwt = app.middleware.jwt({ app });
    router.get('/', controller.home.index);
    // 下面的链接先走完中间件的认证逻辑，再走到后面的过程
    router.get('/user/info', jwt, controller.user.info); // 测试接口用

    router.get('/user/captcha', controller.user.captcha); // 获取图片验证码

    router.post('/user/register', controller.user.create); // 获取注册信息

    router.post('/user/login', controller.user.login); // 获取登录信息
};