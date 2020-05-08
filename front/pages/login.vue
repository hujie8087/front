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
            <el-button type="primary" @click="submitForm()">
                登录
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
            async submitForm() {
                let res = await this.$store.dispatch('user/login', {  //发送登录信息到后端
                    email:this.form.email,
                    password:md5(this.form.password),
                    captcha:this.form.captcha
                })
                if (res.code === 1) {
                    this.$message({
                        showClose: true,
                        message: '恭喜你,登录成功',
                        type: 'success'
                    });
                    setTimeout(() => {
                        this.$router.push({'path':'/'})
                    }, 1000);
                    // localStorage.setItem('token',res.data.token);
                    // console.log('登录',res)
                }
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
      vertical-align: top;
    }
    img{
      width:90px;
      height:50px;
      cursor: pointer;
    }
  }
}
</style>