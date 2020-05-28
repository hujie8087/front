<template>
    <div>
        <h2>用户中心</h2>
        <el-tabs v-model="activeName">
            <el-tab-pane :label='"关注"+following.length' name="following" >
                <nuxt-link v-for="user in following" :key="user._id" :to="'/user/'+user._id">
                    <UserDisplay :user="user"></UserDisplay>
                </nuxt-link>
            </el-tab-pane>
            <el-tab-pane :label='"粉丝"+followers.length' name="followers" >
                <nuxt-link v-for="user in followers" :key="user._id" :to="'/user/'+user._id">
                    <UserDisplay :user="user"></UserDisplay>
                </nuxt-link>
            </el-tab-pane>
            <el-tab-pane :label='"我的文章"+articles.length' name="articles" >
                <ArticleItem 
                v-for="article in articles" 
                :key="article._id" 
                :article="article"
                ></ArticleItem>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import UserDisplay from '~/components/UserDisplay.vue'
import ArticleItem from '@/components/ArticleItem.vue'
    export default {
        components:{
            UserDisplay,
            ArticleItem
        },
        data() {
            return {
                activeName:'following',
                following:[],
                followers:[],
                articles:[]
            }
        },
        mounted () {
            let userid = this.$route.params.id;
            this.userid = userid;
            if (userid) {
                // 关注的人
                this.loadFollowing();
                // 粉丝（被关注）
                this.loadFollowers();
                // 文章
                this.loadArticle();
            }
        },
        methods: {
            async loadFollowing() {
                let ret = await this.$http.get(`/user/${this.userid}/following`);
                if (ret.code === 1) {
                    this.following = ret.data
                    console.log(ret);
                }
            },
            async loadFollowers(){
                let ret = await this.$http.get(`/user/${this.userid}/followers`);
                if (ret.code === 1) {
                    this.followers = ret.data
                    console.log(ret);
                }
            },
            async loadArticle(){
                let ret = await this.$http.get(`/article/${this.userid}/articles`);
                if (ret.code === 1) {
                    this.articles = ret.data
                    console.log(ret);
                }
            }
            
        },
    }
</script>

<style lang="scss" scoped>

</style>