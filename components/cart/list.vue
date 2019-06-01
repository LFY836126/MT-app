<template>
    <!-- cartData对应Data数据中的cartData -->
     <el-table
    :data="cartData"
    style="width: 980px">
        <!-- prop的值对应cartData中每个子项的一个key值 ，它们之间是有一个关联的-->
        <el-table-column
            prop="name"
            label="项目"
            width="532"/>
        <el-table-column
            prop="price"
            label="单价"
            width="132"/>

        <!-- prop：因为prop是单向传递的，不能双向绑定，但是我们这里是既需要展示，又能改变的，所以不用prop传递 -->
        <!-- v-model="scope.row.count" ：就是完成prop没完成的功能，可以实现双向绑定-，scope.row表示的是当前行的变量-->
        <el-table-column
            label="数量"
            width="212">
            <template slot-scope="scope">
                <!-- 计数器  :min代表最小值为0 -->
                <el-input-number
                v-model="scope.row.count"
                :min="0"/>
            </template>
        </el-table-column>

        <!-- width：因为这个宽度是自适应的，所以不用写-->
        <!-- prop：因为这个总价不是表格计算时候扔进来的，是计算得来的，所以这里不用写  -->
        <el-table-column label="总价">
            <template slot-scope="scope">
                <!-- 这里是一个经过计算得到的属性 -->
                <div class="">
                    {{ scope.row.count * scope.row.price }}
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
export default {
    // data(){
    //     return {
    //     cartData: [{
    //       name: '王小虎',
    //       price: 180,
    //       count: 3,
    //     }]
    //   }
    // },
    props:{
        cartData:{
            type:Array,
            default:()=>{
                return [];
            }
        }    
    }
}
</script>