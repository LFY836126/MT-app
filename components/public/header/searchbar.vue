<template>
    <div class="search-panel">
        <el-row class="m-header-searchbar">
            <el-col :span="3" class="left">
                <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
            </el-col>
            <el-col :span="15" class="center">
                <div class="wrapper">
                    <el-input placeholder="搜索商家或地点" v-model="search" @focus="focus" @blur="blur" @input="input"/>
                    <button class="el-button el-button--primary">
                        <i class="el-icon-search"/>
                    </button>
                    <dl class="hotPlace" v-if="isHotPlace">
                        <dt>热门搜索</dt>
                        <dd v-for="(item, index) in hotPlace" :key="index">{{item}}</dd>
                    </dl>
                    <dl class="searchList" v-if="isSearchList">
                        <dd v-for="(item, index) in searchList" :key="index">{{item}}</dd>
                    </dl>
                </div>
                <p class="suggest">
                    <a href="#">故宫博物院</a>
                    <a href="#">故宫博物院</a>
                    <a href="#">故宫博物院</a>
                    <a href="#">故宫博物院</a>
                    <a href="#">故宫博物院</a>
                </p>
                <ul class="nav">
                    <li>
                        <nuxt-link to="/" class="movie">小仙女</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="movie">小仙女</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="movie">小仙女</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="movie">小仙女</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="movie">小仙女</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="movie">小仙女</nuxt-link>
                    </li>
                </ul>
            </el-col>
            <el-col :span="6" class="right">
                <ul class="security">
                    <li><i class="refund"/><p class="txt">随时退</p></li>
                    <li><i class="single"/><p class="txt">不满意免单</p></li>
                    <li><i class="overdue"/><p class="txt">过期退</p></li>
                </ul>
            </el-col>
        </el-row>
    </div>
    <!-- <div class="topbar">1</div> -->
</template>
<script>
export default {
    data(){
        return{
            // 是否聚焦
            isFocus:false,
            // 搜索框内容是否为空
            search: '',
            hotPlace:['故宫', '故宫', '故宫'],
            searchList:['火锅','火锅','火锅'],
        }
    },
    computed:{
        isHotPlace:function(){
            return this.isFocus&&!this.search
        },
        isSearchList:function(){
            return this.isFocus&&this.search
        }
    },
    methods:{
        focus: function(){
            this.isFocus = true;
        },
        blur: function(){
            // this.isFocus = false
            let self = this;
            setTimeout(function(){
                self.focus = false
            },200)
        },
        input: function(){
            console.log('input');
        }
    }
}
</script>
<style>

</style>
