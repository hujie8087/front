'use strict';
const Controller = require('./base');
const marked = require('marked');
class ArticleController extends Controller {
    async detail() {
        const { ctx } = this;
        const { id } = ctx.params;
        const info = await ctx.model.Article.findOneAndUpdate({ _id: id }, { $inc: { views: 1 } }).populate('author');
        this.success(info);
    }
    async create() {
        const { ctx } = this;
        const { userid } = ctx.state;
        const { content } = ctx.request.body;
        console.log(ctx.state);
        // 我们需要对content做一些转义处理
        const title = content.split('\n').find(v => {
            return v.indexOf('# ') === 0;
        });
        const obj = {
            title: title.replace('# ', ''),
            article: content,
            article_html: marked(content),
            author: userid,
        };
        const ret = await ctx.model.Article.create(obj);
        if (ret._id) {
            this.success({
                id: ret._id,
                title: obj.title,
            });
        } else {
            this.error('创建失败');
        }
    }

}

module.exports = ArticleController;