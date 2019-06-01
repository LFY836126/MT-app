<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword"/>
      <categroy
        :types="types"
        :areas="areas"/>
      <list :list="list"/>
    </el-col>
    <el-col :span="5">
      <amap
        v-if="point.length"
        :width="230"
        :height="290"
        :point="point"/>
    </el-col>
  </el-row>

</template>

<script>
import Crumbs from '@/components/products/crumbs.vue'
import Categroy from '@/components/products/categroy.vue'
import List from '@/components/products/list.vue'
import Amap from '@/components/public/map.vue'
export default {
  components:{
    Crumbs,
    Categroy,
    List,
    Amap
  },
  data(){
    return {
      list:[],
      types:[],
      areas:[],
      keyword:'',
      point:[]
    }
  },
  // 通过ssr方式去拿数据
  async asyncData(ctx){
    let keyword = ctx.query.keyword;
    let city = ctx.store.state.geo.position.city.replace('市','') || "哈尔滨";
    let {status,data:{count,pois}} = await ctx.$axios.get('/search/resultsByKeywords',{
      params:{
        keyword,
        city,
      }
    })
    let {status:status2,data:{areas,types}} = await ctx.$axios.get('http://cp-tools.cn/categroy/crumbs',{
    params:{
      // city:ctx.query.city.replace('市','') || "北京",
      city,
      sign:'3e59babc3d4d2e7bc9a5b4fe302d574e',
      }
    })
    // let {status:status2,data:{areas,types}} = await ctx.$axios.get('/categroy/crumbs',{
    //   params:{
    //     city
    //   }
    // })
     if(status===200&&count>0&&status2===200){
      return {
        // 将后端返回的数据进行映射，前端有前端的数据格式，后端有后端的格式，要进行过滤并且映射
        list: pois.filter(item=>item.photos.length).map(item=>{
          return {
            type: item.type,
            img: item.photos[0].url,
            name: item.name,
            comment: Math.floor(Math.random()*10000),
            rate: Number(item.biz_ext.rating),
            price: Number(item.biz_ext.cost),
            scene: item.tag,
            tel: item.tel,
            status: '可订明日',
            location: item.location,
            module: item.type.split(';')[0]
          }
        }),
        // 因为asyncData的返回值是和data做融合的，所以这里这样写就相当于课data中的keywords赋值了
        keyword,
        // // 过滤并且做截断
        areas: areas.filter(item=>item.type!=='').slice(0,5),
        types: types.filter(item=>item.type!=='').slice(0,5),

        point: (pois.find(item=>item.location).location||'').split(',')
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/products/index.scss";
</style>
