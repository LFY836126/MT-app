<template>
    <div class="m-header">
        <!-- 用element布局工具完成布局 -->
        <!-- 使用Element-UI布局`https://element.eleme.cn/#/zh-CN/component/layout`->分栏间隔 -->
        <el-row>
            <el-col>
                <topBar></topBar>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <searchBar></searchBar>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import topBar from './topbar.vue'
import searchBar from './searchbar.vue'
export default {
    components:{
        topBar,
        searchBar
    }
}
</script>
<style lang="scss">
    @import "@/assets/css/public/header/index.scss";
</style>