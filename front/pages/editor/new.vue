<template>
    <div class="write-wrap">
        <div class="write-btn">
            <el-button @click="submit" type="primary">发布</el-button>
        </div>
        <el-row type="flex" justify="" >
            <el-col :span="12">
                <textarea class="md-editor" :value="content"  @input="update"></textarea>
            </el-col>
            <el-col :span="12">
                <div class="markdown-body" v-html="compiledHtml">
                </div>  
            </el-col>
        </el-row>
    </div>
</template>

<script>
import debounce from 'lodash/debounce'
import marked from 'marked' //设置markedown文本格式
    export default {
        // layout:"login",
        data() {
            return {
                content: `# 开课吧最帅
                * vue入门教程
                `
            }
        },
        methods:{
            update:debounce(function(e){
                this.content = e.target.value
            },150),
            async submit(){
                let ret = await this.$http.post('/article/create',{content:this.content})
                if(ret.code===1){
                    this.$notify({
                        title:'创建成功',
                        type:'success',
                        message:`文章《${ret.data.title}》发布成功`
                    })
                    setTimeout(()=>{
                        this.$router.push({path:'/article/'+ret.data.id})
                    }, 1000)
                }
            }
        },
        computed:{
            compiledHtml(){
            return marked(this.content)
            }
        }
    }
</script>

<style scoped>
.write-wrap{
    position: relative;
}
.md-editor{
  width:100%;
  height:100vh;
  outline:none;
  border: 0;
  background-color: aliceblue;
}
.markdown-body{
  height:100vh;
  overflow-y:scroll;
}
.write-btn{
  position: absolute;
  z-index:100;
  right:10px;
  top:10px;
}
</style>