<template>
  <div class="container">
    <ArticleItem 
      v-for="article in articles" 
      :key="article._id" 
      :article="article"
      ></ArticleItem>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue';
export default {
  components:{
    ArticleItem
  },
  data() {
    return {
      articles:[]
    }
  },
  async mounted () {
    let ret = await this.$http.get('article')
    if (ret.code === 1) {
      this.articles = ret.data;
      console.log(this.articles);
    }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
