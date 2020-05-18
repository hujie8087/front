'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    const jwt = app.middleware.jwt({ app });
    router.get('/', controller.home.index);
    // 下面的链接先走完中间件的认证逻辑，再走到后面的过程
    router.group({ name: 'user', prefix: '/user' }, router => { // 创建文章
        const { info, captcha, create, login, isFollow, follow, unfollow, following } = controller.user;

        router.get('/info', jwt, info); // 测试接口用

        router.get('/captcha', captcha); // 获取图片验证码

        router.post('/register', create); // 获取注册信息

        router.post('/login', login); // 获取登录信息

        router.get('/isfollow/:id', jwt, isFollow);

        router.put('/follow/:id', jwt, follow);

        router.delete('/follow/:id', jwt, unfollow);

        router.get('/:id/following', following);
    });

    router.group({ name: 'article', prefix: '/article' }, router => { // 创建文章
        const { create, detail, list } = controller.article;
        router.post('/create', jwt, create);
        router.get('/:id', detail);
        router.get('/', list);
    });
};