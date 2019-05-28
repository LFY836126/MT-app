<template>
    <div class="m-iselect">
        <!-- 直接利用element-ui组件 -->
        <span class="name">按省份选择</span>
        <el-select v-model="pvalue" placeholder="请选择">
            <el-option
            v-for="item in province"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <!--1.增添一个属性-> :disabled="city.length" ,代表city是空的时候，这部分是禁选的-->
        <!--2.这个city的部分，要根据省份的改变而改变，也就是pvalue改变之后，city数组的值也跟着改变--> 
        <el-select v-model="cvalue" placeholder="请选择" :disabled="!city.length">
            <el-option
            v-for="item in city"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>

        <!-- :fetch-suggestions="querySearchAsync"  -> 用户输入内容的时候触发的事件-->
        <!-- @select="handleSelect" -> 当列表被点击选中的时候，触发这个方法
            注意：列表中数据的格式是下面这样的
            { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        -->
        <el-autocomplete
        v-model="input"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入城市中文名或拼音"
        @select="handleSelect"
        ></el-autocomplete>
    </div>
</template>
<script>
import _ from 'lodash'
export default {
    data(){
        return{
            // 所有省份的集合
            province:[],
            // 当前省份的值
            pvalue:'',
            // 单个省份所有城市的集合
            city:[],
            // 当前城市
            cvalue:'',
            // 直接搜索的内容
            input:'',
            // 全国城市的集合
            cities:[],
        }
    },
    methods:{
        // 使用lodash的debounce实现延时处理
        // 两个参数，一个是用户输入的内容，一个是回调函数
        // 后边的200是 ->只有在最后一次点击的200ms后，真正的函数才会触发。
        querySearchAsync:_.debounce(async function(query, cb){
            let self = this;
            // 在这里我需要再造一个城市的集合cities，是全国范围的城市的集合，和city(单个省份的城市)不一样

            // 如果cities有值的话，直接在cities里面搜索
            if(self.cities.length){
                cb(self.cities.filter(item => item.value.indexOf(query) > -1));
            }else{
                // 如果citie没有值的话，获取数据
                let {status, data:{city}} = await self.$axios.get(`geo/city`);
                if(status === 200){
                    self.cities = city.map(item =>{
                        return {
                            value: item.name,
                        }
                    })
                    console.log(self.cities[0]);
                    cb(self.cities.filter(item => item.value.indexOf(query) > -1));
                }else{
                    cb([])
                }
            }
        }, 200),
        handleSelect:function(item){
            // this.$store.state.geo.setPosition.city = item.value;
            location.href="/"
        }
    },
    // 在页面加载之后，将所有省份请求过来
    mounted: async function(){
         let self = this;
         let {status, data:{province}} = await self.$axios.get(`geo/province`);
         self.province = province.map(item =>{
             return {
                 value: item.id,
                 label: item.name
             }
         })
    },
    watch:{
        pvalue: async function(newPvalue){
            let self = this;
            let {status, data:{city}} = await self.$axios.get(`geo/province/${newPvalue}`);
            if(status == 200){
                self.city = city.map(item =>{
                    return {
                        value:item.id,
                        label:item.name,
                    }
                })
                // 切换省份之后，将上一次选择的城市的值清空
                self.cvalue='';
            }
        }
    }
}
</script>
<style lang="scss">
    @import "@/assets/css/changeCity/iselect.scss";
</style>