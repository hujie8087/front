<template>
  <div>
    <el-container>
      <el-header>
        <el-menu mode="horizontal" :default-active="activeIndex" class="header-menu">
          <el-menu-item index="1">
            <img src="/logo.png" alt="" class="logo">
          </el-menu-item>
          <el-menu-item index="2">
            <nuxt-link to="/">首页</nuxt-link>
          </el-menu-item>
          <el-menu-item v-if="userinfo._id" index="4" class="pull-right">
            <nuxt-link :to="'/user/' + userinfo._id">{{userinfo.nickname}}</nuxt-link>
          </el-menu-item>
          <el-menu-item v-if="userinfo._id" index="3" class="pull-right">
            <nuxt-link to="/editor/new">
            <el-button type="primary">写文章</el-button>
            </nuxt-link>
          </el-menu-item>
          <el-menu-item v-if="!userinfo._id" index="5" class="pull-right">
            <nuxt-link to="/login">登录</nuxt-link>
          </el-menu-item>
          <el-menu-item v-if="!userinfo._id" index="6" class="pull-right">
            <nuxt-link to="/register">注册</nuxt-link>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <nuxt />
      </el-main>
      <el-footer>

      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '2'
    }
  },
  mounted () {
    const token = localStorage.getItem('token');
    if (token) {
      this.$store.dispatch('user/detail')
      // let ret = await this.$http.get('/user/info');
      // console.log(token,ret)
    }
  },
  computed:{
    userinfo(){
      return this.$store.state.user
    }
  },
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.header-menu{
  padding-bottom: 10px;
}
.logo {
  float: left;
}
.logo{
  height: 50px;
  width: auto;
  margin: 5px 0;
}
.el-menu-item a{
  text-decoration: none;
  display: block;
}
.el-menu--horizontal .pull-right{
  float:right;
}
</style>
