<template>
    <div class="m-menu">
        <dl class="nav" @mouseleave="mouseleave">
            <dt>全部分类</dt>
            <dd v-for="(item, index) in $store.state.home.menu" :key="index" @mouseenter="enter">
                <i :class="item.type"/>{{item.name}} <span class="arrow"/>
            </dd>
        </dl>
        <div class="detail" v-if="kind" @mouseenter="temEnter" @mouseleave="temLeave">
            <template v-for="(item,index) in curdetail.child">
                <h4 :key="index">{{item.title}}</h4>
                <span v-for="v in item.child" :key="v">
                    {{v}}
                </span>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            kind:'',
            menu: [
                {
                    type:'food', 
                    name:'美食',
                    id:11,
                    child:[
                        {
                            title:'美食',
                            child:['火锅', '汉堡', '小龙虾', '烤冷面', '小可爱']
                        }
                    ]
                },
                {
                    type:'takeout',
                    name:'外卖',
                    id: 12,
                    child:[
                        {
                            title:'外卖',
                            child:['麻辣烫', '烤肉拌饭', '板面', '炒面', '小可爱2号']
                        }
                    ]
                },
                {
                    type:'hotel',
                    name:'酒店',
                    id: 13,
                    child:[
                        {
                            title:'酒店管理',
                            child:['七天', '汉庭', '如家', '南郊', '小可爱3号']
                        },
                        {
                            title:'酒店管理',
                            child:['六天', '34填1', '1如家', '2南郊', '3小可爱3号']
                        },
                        {
                            title:'酒店管理',
                            child:['9七天', '5汉庭', '4如家', '6南郊', '4小可爱3号']
                        }
                    ]
                },
            ]
        }
    },
    computed:{
        curdetail: function(){
            let res = this.$store.state.home.menu.filter(item => item.type === this.kind)[0]
            return res
        }
    },
    methods:{
        mouseleave(){
            let self = this;
            self._timer = setTimeout(function(){
                self.kind = '';
            },150)
        },
        enter: function(e){
            this.kind = e.target.querySelector('i').className 
        },
        temEnter: function(){
            clearTimeout(this._timer)
        },
        temLeave: function(){
            this.kind = ''
        }
    }
}
</script>
<style lang="css">

</style>