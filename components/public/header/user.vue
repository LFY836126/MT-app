<template>
<!-- 登录部分：登录或者未登录 -->
    <div class="m-user">
        <template v-if="user">
            欢迎你 <span class="username">{{user}}</span>
            <nuxt-link to="/exit" class="exit">退出</nuxt-link>
        </template>
        <template v-else>
            <nuxt-link to="/login" class="login">立即登录</nuxt-link>    
            <nuxt-link to="/register" class="register">注册</nuxt-link>    
        </template>
    </div>
</template>
<script>
export default {
    data(){
        return {
            user:'',
        }
    }
}
</script>
<style lang="scss">
    
</style>