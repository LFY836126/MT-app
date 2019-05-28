<template>
    <div class="">
        <dl class="m-categroy">
            <dt>按拼音首字母选择</dt>
            <dd v-for="item in list" :key="item">
                <!-- 因为点击字母要实现跳转，所以要用链接 -->
                <a :href="'#city-'+item">{{item}}</a>
            </dd>
        </dl>
        <dl v-for="item in block" :key="item.title" class="m-categroy-section">
            <dt :id="'city-'+item.title">{{item.title}}</dt>
            <dd>
                <span v-for="c in item.city" :key="c">{{ c }}</span>
            </dd>
        </dl>
    </div>
</template>
<script>
import pyjs from 'js-pinyin'
export default {
    data(){
        return{
            list:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
            // block用来存储 后面用字母 分类城市部分数据,title代表字母，city代表该字母对应城市
            // block:[title, city:[]]
            block:[],
        }
    },
    // 数据获取：利用异步获取的方式
    // 别的方式：SSR或者Vuex或者父子组件相传
    async mounted(){
        let self = this;
        let blocks = [];
        let {status, data:{city}} = await self.$axios.get('/geo/city');
        if(status === 200){
            // p ：城市名称首字母
            let p;
            // c：首字母的编码值
            let c;
            // 存每个字母对应的所有城市，key为字母，value为数组
            let d = {};

            // 将字母对应城市选择出来
            city.forEach(item => {
                // pyjs.getFullChars->拼音这个库自己本身的api，拿到这个参数的拼音全拼
                // toLocaleLowerCase().slice(0, 1) ->转小写，然后拿到首字母
                p = pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0, 1);
                // 拿到p的unicode值
                c = p.charCodeAt(0); 
                // 如果没有这个字母的话，就创建一个新的
                if(!d[p]){
                    d[p] = [];
                }
                d[p].push(item.name);
            })

            //Object.entries(d)： 将d这个对象变为一个数组[ [key, value], [key, value] ]
            for(let [k, v] of Object.entries(d)){
                // 这个k和v就是[key, value]
                // for of 上网查
                blocks.push({
                    title: k.toUpperCase(),
                    city: v,
                })
            }
            // console.log(blocks);
            // 将字母排序显示
            blocks.sort((a, b)=>a.title.charCodeAt(0) - b.title.charCodeAt(0))// 正变，负不变,注意：加上花括号就不好用了，为啥呢？
            self.block = blocks;
        }
    }
}
</script>
<style lang="scss">
    @import "@/assets/css/changeCity/categroy.scss";
</style>