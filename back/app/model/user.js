'use strict';

// 用户字段设计
module.exports = app => {
    const mongoose = app.mongoose; // mongoose实例
    const Schema = mongoose.Schema; // 用户模型

    // 新建一个数据模型
    const UserSchema = new Schema({
        email: { type: String, required: true },
        password: { type: String, required: true, select: false }, // select 在请求中隐藏，不显示出来
        nickname: { type: String, required: true },
        avatar: { type: String, required: false, default: '/user.png' },
        __v: { type: Number, required: true, select: false },
        following: {
            type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        },
    }, { timestamps: true });
    return mongoose.model('User', UserSchema);
};