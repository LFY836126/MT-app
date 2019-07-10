<template>
<!-- 登录部分：登录或者未登录 -->
    <div class="m-user">
        <!-- 登录 -->
        <template v-if="user">
            欢迎你 <span class="username">{{user}}</span>
            <nuxt-link to="/exit" class="exit">退出</nuxt-link>
        </template>
        <!-- 未登录 -->
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
            // 什么时候请求接口呢，有两种方式
            //1.第一种在vuex中同步这种状态，2.不增加SSR负担，在组件中页面渲染完毕之后，我们再去获取接口，我们这里用异步获取
        }
    },
    async mounted(){
        // 请求接口,get后返回一个promise对象，可以利用.then的方式去处理，还可以用async
       const {status, data:{user}} =  await this.$axios.get('/users/getUser')
    //    getUser返回值是一个user和一个email，所以解构的时候，status是axios最外层的一个对象，是获取http前状态的
    //    data里面的部分才是getUser真正返回的内容，也就是user和email
        if(status === 200){
            this.user = user
        }
    }
}
</script>
<style lang="scss">
    
</style>