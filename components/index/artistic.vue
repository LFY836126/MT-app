<template>
    <div>
      <section class='m-istyle'>
          <dl @mouseover="over">
            <dt>有格调</dt>
            <dd :class="{active:kind === 'all'}" keyword="景点" kind="all">全部</dd>
            <dd :class="{active:kind === 'part'}" keyword="美食" kind="part">约会</dd>
            <dd :class="{active:kind === 'spa'}" keyword="丽人" kind="spa">spa</dd>
            <dd :class="{active:kind === 'movie'}" keyword="电影" kind="movie">电影</dd>
            <dd :class="{active:kind==='travel'}" keyword="旅游" kind="travel">品质出游</dd>
          </dl>
          <ul class="ibody">
            <li v-for="item in cur" :key="item.title">
              <el-card :body-style="{ padding: '0px' }" shadow="never">
                <img :src="item.img" class="image">
                <ul class="cbody">
                  <li class="title">{{item.title}}</li>
                  <li class="pos">{{item.detail}}</li>
                  <li class="price">{{item.price}}</li>
                </ul>
              </el-card>
            </li>
          </ul>
        </section>
    </div>
</template>
<script>
export default {
    data(){
      return{
        kind:'all',
        list:{
          all: []
        }
      }
    },
    computed:{
      cur:function(){
        return this.list[this.kind];
      }
    },
    methods:{
      over: async function(e){
          let dom = e.target
          let tag = dom.tagName.toLowerCase()
          let self = this
          if (tag === 'dd') {
            this.kind = dom.getAttribute('kind')
            let keyword = dom.getAttribute('keyword')
            let {status, data:{count, pois}} = await self.$axios.get('/search/resultsByKeywords', {
              params: {
                city: self.$store.state.geo.position.city,
                keyword,
              }
            })
            if(status === 200 && count > 0){
              // 做一个过滤，数据必须有图片
              // 开发时候用自己的字段，然后和后端做数据结合的时候，做一层map映射，避免后端再修改，自己需要做很大的改动
            //   let r = pois.filter(item => item.photos.length).map(item =>{
            //     return {
            //       title: item.name,
            //       pos: item.type.split(';')[0],
            //       price: item.biz_ext.cost || '暂无 ',
            //       img: item.photos[0].url,
            //       url:'//abc.com'
            //      }
            //     })
            //     self.list[self.kind] = r.slice(0, 9)
            //   }else{
            //     self.list[self.kind] =[];
            // }
            let r= pois.filter(item=>item.photos.length).map(item=>{
            return {
              title:item.name,
              pos:item.type.split(';')[0],
              price:item.biz_ext.cost != ''? item.biz_ext.cost:'暂无',
              img:item.photos[0].url,
              url:'//abc.com'
            }
          })
          self.list[self.kind]=r.slice(0,9)
          }else{
            self.list[self.kind]=[]
          }
          }
      }
    },
    async mounted(){
      let self = this;
      let {status, data:{count, pois}} = await self.$axios.get('/search/resultsByKeywords', {
              params: {
                city: self.$store.state.geo.position.city,
                keyword: '景点'
              }
            })
            if(status === 200 && count > 0){
              // 做一个过滤，数据必须有图片
              // 开发时候用自己的字段，然后和后端做数据结合的时候，做一层map映射，避免后端再修改，自己需要做很大的改动
              let r = pois.filter(item => item.photos.length).map(item =>{
                return {
                  title: item.name,
                  pos: item.type.split(';')[0],
                  price: item.biz_ext.cost == ''? '暂无':`￥${item.biz_ext.cost}/起`,
                  img: item.photos[0].url,
                  url:'//abc.com'
                 }
                })
                self.list[self.kind] = r.slice(0, 9)
              }else{
                self.list[self.kind] =[];
            }
    }
}
</script>
<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>