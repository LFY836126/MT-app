<template>
    <div class="page-changeCity">
        <!-- 可以看一下美团的城市页面的结构，是分为三行，每一行都铺满一行 -->
        <el-row>
            <el-col :span="24">
                <iSelect></iSelect>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <Hot></Hot>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <Categroy></Categroy>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import iSelect from '../components/changeCity/iSelect.vue'
import Hot from '../components/changeCity/Hot.vue'
import Categroy from '../components/changeCity/Categroy.vue'
export default {
    components:{
        iSelect,
        Hot,
        Categroy
    }
}
</script>
<style lang="scss">
    
</style>