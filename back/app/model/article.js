'use strict';

// 用户字段设计
module.exports = app => {
    const mongoose = app.mongoose; // mongoose实例
    const Schema = mongoose.Schema; // 用户模型

    // 新建一个数据模型
    const ArticleSchema = new Schema({
        __v: { type: Number, select: false },
        title: { type: String, required: true },
        // 文章的markdown
        article: { type: String, required: true, select: false },
        article_html: { type: String, required: true },
        // 一对多，每个文章都有作者,只存储用户的id
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User', // 指向User
            required: true,
        },
        views: { type: Number, required: false, default: 1 },
        likes: { type: Number, required: false, default: 0 },
        disLikes: { type: Number, required: false, default: 0 },
    });
    return mongoose.model('Article', ArticleSchema);
};