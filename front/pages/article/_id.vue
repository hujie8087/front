<template>
  <div class="kkb-container">
      <UserDisplay :user="article.author">
        <el-button type="success" v-if="isFollow" @click="unfollow">已关注</el-button>

        <el-button v-else @click='follow'>关注</el-button>
      </UserDisplay>
      <el-divider></el-divider>
      <div class="article" v-html="article.article_html"></div>
      <el-divider></el-divider>
      <div class="action">
        <el-button :type="likeState ? 'success' : ''" icon="el-icon-thumb" @click="likeAction">{{article.likes}}</el-button>
        <el-button :type="disLikeState?'success' : ''" icon="el-icon-thumb" @click="disLikeAction">{{article.disLikes}}</el-button>
      </div>
  </div>
</template>

<script>
import UserDisplay from '~/components/UserDisplay.vue'
export default {
  components:{UserDisplay},
  data(){
    return {
      isFollow:false,
      likeState:false,
      disLikeState:false,
      likes:0,
      article:{
        title:"",
        views:0,
        likes:0,
        disLikes:0,
        author:{
        }
      }
    }
  },
  mounted(){
    let {id} = this.$route.params
    this.id = id
    this.getArticle()
    let token = localStorage.getItem('token');
    if (token) {
      this.getLikeState()
    }
  },
  methods:{
    async getLikeState(){
      let ret = await this.$http.get('user/article/' + this.id)
      if (ret.code === 1) {
        this.likeState = ret.data.like;
        this.disLikeState = ret.data.disLike;
      }
    },
    async likeAction(){
      let type = this.likeState?'delete':'put';
      let offset = this.likeState?-1:1;
      let ret = await this.$http[type]('user/article/' +this.id);
      if (ret.code === 1) {
        this.likes = ret.data.likes;
        this.getLikeState();
        this.article.likes += offset;
        // this.getArticle()
      }
    },
    async disLikeAction(){
      let type = this.disLikeState?'delete':'put';
      let offset = this.disLikeState?-1:1;
      let ret = await this.$http[type]('user/disArticle/' +this.id);
      if (ret.code === 1) {
        this.disLikes = ret.data.disLikes;
        this.getLikeState();
        this.article.disLikes += offset;
        // this.getArticle()
      }
    },
    async follow(){
      let ret = await this.$http.put('/user/follow/'+this.article.author._id)
      this.checkFollowStatus()
    },

    async unfollow(){
      let ret = await this.$http.delete('/user/follow/'+this.article.author._id)
      this.checkFollowStatus()
    },
    
    async getArticle(){
      let ret = await this.$http.get('/article/'+this.id)
      this.article = ret.data
      // 查询我和文章作者的关注关系
      this.checkFollowStatus()
    },
    async checkFollowStatus(){
      let isFollow = await this.$http.get('/user/isfollow/'+this.article.author._id)
      if(isFollow.code===1){
        this.isFollow = isFollow.data.isFollow
      }
    }
  }
} 
</script>

<style>

</style>