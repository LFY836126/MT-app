<template>
    <div>
       <el-row class="page-cart">
           <!-- 以下两个为平行结构，不会同时显示 -->
           <!-- 购物车不为空的时候 -->
           <el-col v-if="cart.length" :span="24" class="m-cart">
               <!-- :cart-data ：因为在子组件接收数据变量是cartData，所以这里可以这样写-->
               <list :cart-data="cart"/>
               <p>
                    应付金额：<em class="money">￥{{ total }}</em>
               </p>
               <div class="post">
                    <el-button type="primary" @click="submit">提交订单</el-button>
                </div>
           </el-col>
           <!-- 购物车为空的时候 -->
           <el-col v-else class="empty">购物车为空</el-col>
        </el-row> 
    </div>
</template>
<script>
import list from '@/components/cart/list.vue'
export default { 
    components:{
        list,
    },
    data(){
        return {
            cart:[],
        }
    },
    methods:{
        submit: async function(){
            const { status, data: { code, id }} = await this.$axios.post('/order/createOrder', {
                id: this.cartNo,
                price: this.cart[0].price,
                count: this.cart[0].count
            })
            // console.log('status');
            console.log(this.cartNo + "  " + this.cart[0].price+ "  " +this.cart[0].count);
            if (status === 200 && code === 0) {
                this.$alert(`恭喜您，已成功下单，订单号:${id}`, '下单成功', {
                confirmButtonText: '确定',
                callback: action => {
                    location.href = '/order'
                    }
                })
            }
        }
    },
    computed:{
        total(){
            // 当list组件中scope.row.count值发生改变，就会导致data中的cart中的count值发生改变，所以total的值就会改变
            let total = 0;
            this.cart.forEach(item=>{
                total += item.price * item.count;
            })
            return total
        }
    },
    async asyncData(ctx) {
         let {status,data:{code,data:{name,price}}}=await ctx.$axios.post('/cart/getCart',{
            id:ctx.query.id
            })
            if(status===200&&code===0&&name){
            return {
                cart:[{
                name,
                price,
                count:1
                }],
                cartNo:ctx.query.id
            }
        }
    },
}
</script>
<style lang="scss">
  @import "@/assets/css/cart/index.scss";
</style>