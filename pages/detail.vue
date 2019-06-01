<template>
  <div class="page-detail">
    <el-row>
      <el-col :span="24">
        <crumbs
          :keyword="keyword"
          :type="type"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <summa :meta="product"/>
      </el-col>
    </el-row>
    <el-row class="m-title">
      <el-col :span="24">
        <h3>商家团购及优惠</h3>
      </el-col>
    </el-row>
    <!-- 如果可以购买，或者登录之后才可以进行相关操作 -->
    <el-row v-if="canOrder || !login">
      <el-col :span="24">
        <!-- 下面这两个list和div是平行结构，只能有一个显示  -->
        <list
          v-if="login"
          :list="list"/>
        <div
          v-else
          class="deal-need-login">
          <img
            src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png"
            alt="登录查看">
          <span>请登录后查看详细团购优惠</span>
          <el-button
            type="primary"
            round>
            <a href="/login">立即登录</a>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Crumbs from '@/components/detail/crumbs.vue';
import Summa from '@/components/detail/summary.vue'
import List from '@/components/detail/list.vue'
export default {
  components:{
    Crumbs,
    Summa,
    List
  },
  computed:{
    canOrder:function(){
      // 将抓回来的列表中的数据挨个检查，如果说没有一个item的图片是存在的或者说列表中所有数据都没有照片，认为数据是无效的
      return this.list.filter(item=>item.photos.length).length
    }
  },
  // 获取数据
  // 注意asyncData是在服务端执行的，不是在客户端执行的，所以获取数据的时候，利用ctx.query
  async asyncData(ctx){
    let {keyword,type}=ctx.query;
    let {status,data:{product,more:list,login}}=await ctx.$axios.get('/search/products',{
      params:{
        keyword,
        type,
        city:ctx.store.state.geo.position.city
      }
    })
    if(status===200){
    //  asyncData返回方法是和data相关联的，所以，data中的数据就可以不用写
      return {
        keyword,
        product,
        type,
        list,
        login
      }
    }else{
      return {
        keyword,
        product:{},
        type,
        list:[],
        login:false
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/detail/index.scss";
</style>
