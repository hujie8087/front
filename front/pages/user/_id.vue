<template>
    <div>
        <p>用户名：{{userinfo.email}}</p>  
        <p>昵称：{{userinfo.nickname}}</p>  
    </div>
</template>

<script>
    export default {
        data() {
        },
        mounted () {
            const token = localStorage.getItem('token');
            console.log(token)
            if (token) {
            this.$store.dispatch('user/detail')
            }
        },
        computed: {
            userinfo(){
            return this.$store.state.user
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>