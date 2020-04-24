<template>
    <div class="login-container">
        <el-form class="login-form" status-icon ref="form" :model="form" :rules="rules">
            <div class="title-container">
                <img src="../static/logo.png" alt="" srcset="">
            </div>
            <el-form-item prop="email">
                <span class="svg-container">
                <i class="el-icon-mobile"></i>
                </span>
                <el-input
                ref="email"
                v-model="form.email"
                placeholder="邮箱"
                name="email"
                >
                </el-input>
            </el-form-item>
            <el-form-item prop="nickname">
                <span class="svg-container">
                <i class="el-icon-user"></i>
                </span>
                <el-input
                ref="nickname"
                v-model="form.nickname"
                placeholder="昵称"
                name="nickname"
                >
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                <i class="el-icon-lock"></i>
                </span>
                <el-input
                ref="password"
                v-model="form.password"
                placeholder="请输入密码"
                name="password"
                type="password"
                >
                </el-input>
            </el-form-item>
            <el-form-item prop="repassword">
                <span class="svg-container">
                <i class="el-icon-lock"></i>
                </span>
                <el-input
                ref="repassword"
                v-model="form.repassword"
                placeholder="再次确认密码"
                name="repassword"
                type="password"
                >
                </el-input>
            </el-form-item>
            <el-form-item prop="captcha" class="email-code">
                <span class="svg-container">
                <i class="el-icon-user"></i>
                </span>
                <el-input
                ref="captcha"
                v-model="form.captcha"
                placeholder="验证码"
                name="captcha"
                >
                </el-input>
                <div class="send-email-btn">
                    <div class="el-button">
                        <img :src="code.captcha" alt="" srcset="" @click="resetCaptcha">
                    </div>
                </div>
            </el-form-item>
            <el-button type="primary" @click="submitForm('form')">
                注册
            </el-button>
        </el-form>
    </div>
</template>

<script>
import md5 from 'md5';
    export default {
        layout:'login',
        data() {
            return {
                form: {
                    email:"316783812@qq.com",
                    password:'123456',
                    repassword:'123456',
                    nickname:'我是最棒的',
                    captcha:''
                },
                rules:{
                    email:[
                        {required:true, message:'请输入邮箱'},
                        {type:"email", message:'请输入正确的邮箱格式'}
                    ],
                    password:[
                        {required:true, message:'请输入密码'},
                    ],
                    repassword:[
                        {required:true, message:'请重新输入密码'},
                    ],
                    nickname:[
                        {required:true, message:'请您的昵称'},
                    ],
                    captcha:[
                        {required:true, message:'请输入验证码'},
                    ]
                },
                code:{
                    captcha:'/api/user/captcha'
                }
            }
        },
        methods: {
            resetCaptcha() {
                this.code.captcha = '/api/user/captcha?_t'+ new Date().getTime()
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$refs.form.validate(async valid=>{
                        if (valid) {
                            console.log('发送成功')
                            let obj = {
                                email:this.form.email,
                                captcha:this.form.captcha,
                                nickname:this.form.nickname,
                                password:md5(this.form.password),
                                repassword:md5(this.form.repassword)
                            }
                            let ret = await this.$http.post('/user/register',obj)
                            let {message} = ret
                            console.log(message)
                            if (ret.code<0) {
                                this.$message({
                                showClose: true,
                                message: message,
                                type: 'error'
                                });
                            }else{
                                this.$message({
                                showClose: true,
                                message: '恭喜你,注册成功',
                                type: 'success'
                                });
                                // this.$nuxt.$router.redirect('/')
                            }
                            console.log(ret)
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            }
        },
    }
</script>

<style lang="scss">

.email-code{
  width:340px;
  position: relative;
  .send-email-btn{
    position: absolute;
    top:0;
    right:-110px;
    .el-button{
      width:90px;
      height:50px;
      padding: 0;
    }
    img{
      width:90px;
      height:50px;
      cursor: pointer;
    }
  }
}
</style>