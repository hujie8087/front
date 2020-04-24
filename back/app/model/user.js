'use strict';

// 用户字段设计
module.exports = app => {
  const mongoose = app.mongoose; // mongoose实例
  const Schema = mongoose.Schema; // 用户模型

  // 新建一个数据模型
  const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    nickname: { type: String, required: true },
    avatar: { type: String, required: false, default: '/user.png' },
  });
  return mongoose.model('User', UserSchema);
};
