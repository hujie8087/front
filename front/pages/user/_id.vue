<template>
    <div>
        <h2>用户中心</h2>
        <el-tabs v-model="activeName">
            <el-tab-pane :label='"关注"+fllowing.length' name="following" >
                <nuxt-link v-for="user in fllowing" :key="user._id" :to="'/user/'+user._id">
                    <UserDisplay :user="user"></UserDisplay>
                </nuxt-link>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import UserDisplay from '~/components/UserDisplay.vue'
    export default {
        components:{
            UserDisplay
        },
        data() {
            return {
                fllowing:'',
                activeName:'following'
            }
        },
        mounted () {
            let userid = this.$route.params.id;
            this.userid = userid;
            if (userid) {
                // 关注的人
                this.loadFllowing();
                // 粉丝（被关注）
                this.loadFllower();
                // 文章
                this.loadArticle();
            }
        },
        methods: {
            async loadFllowing() {
                let ret = await this.$http.get(`/user/${this.userid}/following`);
                if (ret.code === 1) {
                    this.fllowing = ret.data
                    console.log(ret);
                }
            },
            loadFllower(){

            },
            loadArticle(){
                
            }
            
        },
    }
</script>

<style lang="scss" scoped>

</style>