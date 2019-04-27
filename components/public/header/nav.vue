<template>
    <div class="m-nav">
        <ul class="nav">
            <li class="list">
                <!-- 用最简单的dom结构实现比较复杂交互 -->
                <!-- 因为"我的美团" 这部分的内容既要兼顾着同级平行结构，又要有照顾到下面"我的订单"等那部分的内容，所以在这里并不将它和"我的订单"等部分内容放在一个结构里  -->
                <nuxt-link to="/my">我的美团</nuxt-link>
                <dl>
                    <dd><nuxt-link to="/order">我的订单</nuxt-link></dd>
                    <dd><nuxt-link to="/order">我的收藏</nuxt-link></dd>
                    <dd><nuxt-link to="/order">抵用券</nuxt-link></dd>
                    <dd><nuxt-link to="/order">账户设置</nuxt-link></dd>
                </dl>
            </li>
            <li>
                <nuxt-link to="/order">手机APP</nuxt-link>
            </li>
            <li class="list bd">
                <nuxt-link to="/center">商家中心</nuxt-link>
                <dl>
                    <dd><nuxt-link to="/userCenter" >登录商家中心</nuxt-link></dd>
                    <dd><nuxt-link to="/coop">我想合作</nuxt-link></dd>
                    <dd><nuxt-link to="/wap">免费手机开店</nuxt-link></dd>
                    <dd><nuxt-link to="/kaipiao">商家申请开票</nuxt-link></dd>
                </dl>
            </li>
            <li class="list site">
                <nuxt-link to="/site">网址导航</nuxt-link>
                <div class="subContainer">
                    <!-- 官网上这部分的列表结构是有标题有内容，所以我们采取利用dl不是ul，，因为dl中dt和dd正好符合标题和内容这样的结构 -->
                    <dl class="hotel">
                        <dt>酒店旅游</dt>
                        <dd>国际机票</dd>
                        <dd>国际机票</dd>
                        <dd>国际机票</dd>
                        <dd>国际机票</dd>
                        <dd>国际机票</dd>
                        <dd>国际机票</dd>
                        <dd>国际机票</dd>
                        <dd>国际机票</dd>
                        <dd>国际机票</dd>
                        <dd>国际机票</dd>
                        <dd>国际机票</dd>
                        <dd>国际机票</dd>
                        <dd>国际机票</dd>
                        <dd>国际机票</dd>
                        <dd>国际机票</dd>
                        <dd>国际机票</dd>
                    </dl>
                    <dl class="food">
                        <dt>吃美食</dt>
                        <dd>烤鱼</dd>
                        <dd>特色小吃</dd>
                        <dd>烧烤</dd>
                        <dd>烧烤</dd>
                        <dd>烧烤</dd>
                        <dd>烧烤</dd>
                        <dd>烧烤</dd>
                        <dd>烧烤</dd>
                    </dl>
                    <dl class="movie">
                        <dt>看电影</dt>
                        <dd>热影电影</dd>
                        <dd>热影电影</dd>
                        <dd>热影电影</dd>
                        <dd>热影电影</dd>
                        <dd>热影电影</dd>
                        <dd>热影电影</dd>
                        <dd>热影电影</dd>
                        <dd>热影电影</dd>
                    </dl>
                    <dl class="app">
                        <dt>手机应用</dt>
                        <dd><a href="#"><img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/appicons/meituan.png" alt="美团app" title="美团app"></a></dd>
                        <dd><a href="#"><img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/appicons/meituan.png" alt="美团app" title="美团app"></a></dd>
                        <dd><a href="#"><img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/appicons/meituan.png" alt="美团app" title="美团app"></a></dd>
                        <dd><a href="#"><img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/appicons/meituan.png" alt="美团app" title="美团app"></a></dd>
                        <dd><a href="#"><img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/appicons/meituan.png" alt="美团app" title="美团app"></a></dd>
                    </dl>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
    
</style>