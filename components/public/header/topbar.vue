<template>
<!-- 从element组件上直接粘-> https://element.eleme.cn/#/zh-CN/component/layout -->
    <!-- :gutter="15" => 间隔15 要是设为0就没有padding了，15的话，padding就是每个为7.5-->
    <!-- :span="6"  =>  6个栅格，一共是24-->
    <el-row :gutter="0" class="m-header">
        <el-col :span="5">
            <Geo></Geo>
        </el-col>
        <el-col :span="5">
            <User></User>
        </el-col>
        <el-col :span="14">
            <navBar></navBar>
        </el-col>
    </el-row>
</template>
<script>
import Geo from './geo.vue'
import User from './user.vue'
import navBar from './nav.vue'
export default {
    components:{
        Geo,
        User,
        navBar
    }
}
</script>
<style lang="scss">
    @import "@/assets/css/public/layout.scss";
    @import "@/assets/css/public/header/index.scss";
</style>