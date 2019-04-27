<template>
    <div class="m-life">
        <el-row :gutter="0">
            <el-col :span="14">
                <Lsilder></Lsilder>
            </el-col>
            <el-col :span="4">
                <!-- <img src="http://p0.meituan.net/codeman/e473bb428f070321269b23370ff02ba956209.jpg" alt=""> -->
                <div class="m-life-pic"/>
            </el-col>
            <el-col :span="6"></el-col>
        </el-row>
        <el-row :gutter="0">
            <el-col :span="7">
                <div class="m-life-hotel"></div>
            </el-col>
            <el-col :span="7">
                <div class="m-life-music"></div>
            </el-col>
            <el-col :span="4">
                <div class="m-life-coop"></div>
            </el-col>
            <el-col :span="6"></el-col>
        </el-row>
    </div>
</template>
<script>
import Lsilder from './silder.vue'
export default {
    components:{
        Lsilder,
    }
}
</script>
<style lang="scss">
    @import "@/assets/css/index/life.scss";
</style>