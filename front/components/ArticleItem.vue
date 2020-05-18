<template>
    <div class="article-item">
        <nuxt-link :to="'/article/' + article._id ">
            <h2>
                {{article.title}}
            </h2>
        </nuxt-link>
        <p>
            <UserDisplay :user=article.author></UserDisplay>
            <span class="action">
                <i class="el-icon-view">{{article.views}}</i>
            </span>
            <span class="likes">
                <i class="el-icon-thumb">{{article.like}}</i>
            </span>
        </p>
    </div>
</template>

<script>
import UserDisplay from '@/components/UserDisplay.vue';
    export default {
        components: {
            UserDisplay
        },
        props:['article']
    }
</script>

<style scoped>
.article-item{
    width: 100%;
    margin-bottom: 20px;
    text-align: left;
}
.article-item a{
    color: #67c23a;
}
.action,.likes{
    width: 50px;
    display: inline-block;
}
</style>