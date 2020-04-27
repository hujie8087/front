'use strict';

const Controller = require('./base');
const md5 = require('md5');

const hashCode = '45648123@!';

class UserController extends Controller {
    async info() {
        // this.success({
        //     name: 'kkb',
        // });
        const { ctx } = this;
        const { email } = ctx.state;
        const user = await this.CheckEmail(email);
        return this.success(user);
    }
    async captcha() {
        const { ctx } = this;
        const captcha = this.service.tools.captcha(); // 调用tools函数生产验证码
        console.log('图片验证码' + captcha.text); // captcha.text 查看验证码的文本内容
        ctx.session.captcha = captcha.text; // 把验证码文本存入全局变量中
        ctx.response.type = 'image/svg+xml'; // 规定验证码渲染的格式，以图片的格式渲染
        ctx.body = captcha.data; // captcha.data 验证码的svg数据
    }

    async CheckEmail(email) {
        const user = await this.ctx.model.User.findOne({ email });
        return user;
    }
    async CheckNickname(nickname) {
        const name = await this.ctx.model.User.findOne({ nickname });
        return name;
    }
    async login() {
        //   用户登录成功
        const { ctx, app } = this; // 获取后端储存的验证码
        const { captcha, email, password } = ctx.request.body; // 获取前端请求过来的验证码
        // console.log(captcha, email, password);
        if (captcha.toUpperCase() === ctx.session.captcha.toUpperCase()) {
            // 登录
            const user = await ctx.model.User.findOne({
                email,
                password: md5(password + hashCode),
            });
            // console.log(user);
            if (user) {
                const { nickname } = user;
                const token = app.jwt.sign({ // 缓存用户信息
                    nickname,
                    email,
                    _id: user.__id,
                }, app.config.jwt.secret, { // 利用jwt加密token
                    expiresIn: '1h', // 设置过期时间
                });
                console.log(token);
                this.success({ token, email, nickname });
            } else {
                this.error('用户名密码错误');
            }
        } else {
            this.error('验证码错误');
        }
    }
    async create() {
        //   新增用户成功
        const { ctx } = this; // 获取后端储存的验证码
        const { captcha, email, password, nickname } = ctx.request.body; // 获取前端请求过来的验证码
        console.log(ctx.request.body);
        if (captcha.toUpperCase() === ctx.session.captcha.toUpperCase()) {
            // 新增数据，
            // 先获取数据模型 在mongodb里新增数据
            if (await this.CheckEmail(email)) {
                return this.error('邮箱已注册');
            }
            if (await this.CheckNickname(nickname)) {
                return this.error('昵称重复了');
            }
            const ret = await ctx.model.User.create({
                email,
                password: md5(password + hashCode),
                nickname,
            });
            if (ret._id) {
                this.success('创建成功');
            }
            this.success('新增');
        } else {
            this.error('验证码错误');
        }
    }
}

module.exports = UserController;