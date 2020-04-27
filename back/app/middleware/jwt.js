// 中间件
'use strict';
// 路由中使用
module.exports = ({ app }) => {
    return async function verify(ctx, next) {
        const token = ctx.request.header.authorization.replace('Bearr ', '');
        try {
            const ret = await app.jwt.verify(token, app.config.jwt.secret);
            console.log('中间件解密token信息', ret);
            ctx.state.email = ret.email;
            ctx.state.userId = ret._id;
            await next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                ctx.body = {
                    code: -666,
                    message: '登录过期',
                };
                return ctx.body;
            }
            console.log('中间件错误', error);
        }
    };
};