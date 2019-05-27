<template>
    <div>
        
    </div>
</template>
<script>
export default {
    layout:'blank',
    // 为什么用中间件来实现退出操作呢，
    // 因为，我们要求到达退出页面之后，自动的去执行，而不是像按了什么按钮去执行，所以利用middleware机制，触发这个获取退出的接口，让这个接口响应完之后我们再做自动化的执行动作
    middleware: async (ctx) =>{
        let {status, data} = await ctx.$axios.get('/users/exit')
        if(status === 200 && data && data.code === 0){
            window.location.href = '/'
        }
    }
}
</script>
<style lang="css">
    
</style>