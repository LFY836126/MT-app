<template>
    <div>
      <section class='m-istyle'>
          <dl @mouseover="over">
            <dt>有格调</dt>
            <dd :class="{active:kind === 'all'}" kind="all">全部</dd>
            <dd :class="{active:kind === 'part'}" kind="part">约会</dd>
            <dd :class="{active:kind === 'spa'}" kind="spa">spa</dd>
            <dd :class="{active:kind === 'movie'}" kind="movie">电影</dd>
          </dl>
          <ul class="ibody">
            <li v-for="item in cur" :key="item.title">
              <el-card :body-style="{ padding: '0px' }" shadow="never">
                <img :src="item.imgUrl" class="image">
                <ul class="cbody">
                  <li class="title">{{item.title}}</li>
                  <li class="pos">{{item.detail}}</li>
                  <li class="price">￥{{item.price}}起</li>
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
          all: [
            {
              title:'必胜客',
              location:'国际会展中心',
              price:'159',
              imgUrl:'//p1.meituan.net/msmerchant/e79b718e32bdf3e2f2da447001a68d5d1591138.jpg@460w_260h_1e_1c',
              detail:'超值丰盛2人惨',
            },
            {
              title:'好利来',
              location:'太平桥',
              price:'159',
              imgUrl:'//p1.meituan.net/msmerchant/e79b718e32bdf3e2f2da447001a68d5d1591138.jpg@460w_260h_1e_1c',
              detail:'超值丰盛2人惨',
            },
            {
              title:'米奇',
              location:'私人蛋糕',
              price:'159',
              imgUrl:'//p1.meituan.net/msmerchant/e79b718e32bdf3e2f2da447001a68d5d1591138.jpg@460w_260h_1e_1c',
              detail:'[超值丰盛2人惨]',
            }
          ],
          part: [
            {
              title:'精美饰品',
              location:'人民币',
              price:'159',
              imgUrl:'//p1.meituan.net/msmerchant/e79b718e32bdf3e2f2da447001a68d5d1591138.jpg@460w_260h_1e_1c',
              detail:'[超值丰盛2人惨]',
            },
            {
              title:'艺术蛋糕',
              location:'南岗区',
              price:'159',
              imgUrl:'//p1.meituan.net/msmerchant/e79b718e32bdf3e2f2da447001a68d5d1591138.jpg@460w_260h_1e_1c',
              detail:'[超值丰盛2人惨]',
            }
          ]
        }
      }
    },
    computed:{
      cur:function(){
        return this.list[this.kind];
      }
    },
    methods:{
      over: function(e){
        this.kind = e.target.querySelector('dd');
      }
    }
}
</script>
<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>