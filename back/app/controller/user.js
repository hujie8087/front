'use strict';

const BaseController = require('./base');
const md5 = require('md5');

const hashCode = '45648123@!';

class UserController extends BaseController {
    async info() {
        const { ctx } = this;
        const { email } = ctx.state;
        const user = await this.CheckEmail(email);
        this.success(user);
        // this.success({
        //   name:'kkb'
        // })
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
                    _id: user._id,
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
    async isFollow() {
        const { ctx } = this;
        const me = await ctx.model.User.findById(ctx.state.userid); // 找到当前的用户的信息
        const isFollow = !!me.following.find(v => v.toString() === ctx.params.id);
        this.success({ isFollow });
    }
    async follow() {
        // 把关注的用户id 放在following字段李
        const { ctx } = this;
        const me = await ctx.model.User.findById(ctx.state.userid);
        const isFollow = !!me.following.find(v => v.toString() === ctx.params.id);
        if (!isFollow) {
            me.following.push(ctx.params.id);
            me.save();
            this.message('关注成功');
        }
    }

    async unfollow() {
        // 取消关注
        const { ctx } = this;
        const me = await ctx.model.User.findById(ctx.state.userid);
        const index = me.following.map(id => id.toString()).indexOf(ctx.params.id);
        if (index > -1) {
            me.following.splice(index, 1);
            me.save();
            this.message('取消成功');
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
    async following() {
        const { ctx } = this;
        const user = await ctx.model.User.findById(ctx.params.id).populate('following');
        this.success(user.following);
    }
    async followers() {
        const { ctx } = this;
        const users = await ctx.model.User.find({ following: ctx.params.id }); // 过滤following字段中有用户ID的数据
        this.success(users);
    }
    async articleState() {
        const { ctx } = this;
        const me = await ctx.model.User.findById(ctx.state.userid);
        const like = !!me.likeArticle.find(id => id.toString() === ctx.params.id);
        const disLike = !!me.disLikeArticle.find(id => id.toString() === ctx.params.id);
        this.success({ like, disLike });
    }
    async likeArticle() {
        const { ctx } = this;
        const me = await ctx.model.User.findById(ctx.state.userid);
        const isLike = !!me.likeArticle.find(v => v.toString() === ctx.params.id);
        // const isDisLike = !!me.disLikeArticle.find(v => v.toString() === ctx.params.id);
        if (!isLike) {
            me.likeArticle.push(ctx.params.id);
            me.save();
            await ctx.model.Article.findByIdAndUpdate(ctx.params.id, { $inc: { likes: 1 } });
            this.success('点赞成功');
        }
    }
    async cancelLikeArticle() {
        const { ctx } = this;
        const me = await ctx.model.User.findById(ctx.state.userid);
        const index = me.likeArticle.map(id => id.toString()).indexOf(ctx.params.id);
        if (index > -1) {
            me.likeArticle.splice(index, 1);
            me.save();
            await ctx.model.Article.findByIdAndUpdate(ctx.params.id, { $inc: { likes: -1 } });
            this.success('取消点赞成功');
        }
    }
    async disLikeArticle() {
        const { ctx } = this;
        const me = await ctx.model.User.findById(ctx.state.userid);
        // const isLike = !!me.likeArticle.find(v => v.toString() === ctx.params.id);
        const isDisLike = !!me.disLikeArticle.find(v => v.toString() === ctx.params.id);
        // const index = me.likeArticle.map(id => id.toString()).indexOf(ctx.params.id);
        if (!isDisLike) {
            me.disLikeArticle.push(ctx.params.id);
            me.save();
            await ctx.model.Article.findByIdAndUpdate(ctx.params.id, { $inc: { disLikes: 1 } });
            this.success('踩成功');
        }
    }
    async cancelDisLikeArticle() {
        const { ctx } = this;
        const me = await ctx.model.User.findById(ctx.state.userid);
        const index = me.disLikeArticle.map(id => id.toString()).indexOf(ctx.params.id);
        if (index > -1) {
            me.disLikeArticle.splice(index, 1);
            me.save();
            await ctx.model.Article.findByIdAndUpdate(ctx.params.id, { $inc: { disLikes: -1 } });
            this.success('取消踩成功');
        }
    }

}

module.exports = UserController;