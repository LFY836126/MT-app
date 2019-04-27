## 实战准备
1. 项目安装：
    + npm install -g npx 
    + npx create-nuxt-app project-name
    + npm install --update-binary
2. 
    + 出现问题：当更改server下面的index.js文件的时候，就是将require改为import报错
    + 原因：因为node本身不支持import这个指令，
    + 解决：使用babel
        ```
        1. 在package.json文件中更改dev和start，都在配置的末尾加上--exec babel-node
        2. 建立.babelrc文件，文件内容为
            {
                "presets": ["es2015"]
            }
        3. 安装插件：npm install babel-preset-es2015
        4. 重启服务 npm run dev
        ```
3. 支持sass语法，安装插件：npm i sass-loader node-sass eslint@^3.18
4. 支持axios  npm install @nuxtjs/axios
    ```
    nuxt.config.js:
        modules: [
            '@nuxtjs/axios',
        ],
        axios: {
            
        },
    ```

## 需求分析
1. 模板设计：主要是解决复用性问题
2. 组件设计：
3. 数据结构设计
4. 接口设计

## 首页开发

### 需求分析(模板设计)->(img)

### 需求分析(组件设计)：

#### 城市服务组件
1. 业务逻辑：首先浏览器发出request请求，建立http连接，服务器端可以拿到request.ip，也就是浏览器端向我发起请求的时候，根据http协议，我就可以知道ip地址，然后我拿到ip地址去数据中心做映射，这个ip对应哪个城市，然后就可拿到城市名称，服务器拿到city之后下发给浏览器
2. 思考：获取城市两种方法
    + 当页面渲染完了，我向服务器发一个请求(可以是空的内容，因为空的内容也会建立链接)，建立链接，拿到ip，然后.....,最后拿到city，也就是组件是在mounted事件之后发送一个请求，然后服务器给你这个城市的名称，再渲染到组件上去
> 弊端：拿到页面，获取城市，一共发了两次请求，除了浪费请求，还有体验问题，就是闪了一下
    + 在请求文档的时候，那个时候服务器已经知道你的ip了，在那个时候，完全可以拿到ip对应的城市，这个数据是可以当时返回给你的，不需要额外再建立一次连接，利用vuex同步状态，再利用ssr，就可以做到一次请求就可以拿到数据

#### 用户数据&状态
1. 业务逻辑：首先浏览器发一个request请求，然后服务器根据passport来验证当前是否是登录用户，passport会查当前redis，因为你发这个请求的时候，它会带着cookie过来，服务器的passport会用你的cookie再和redis去做认证，如果是登录状态的话，它会返回你的用户名

#### 项目目录
```
components
    index
        artistic.vue            -->页面下半部分，有格调的那个部分
        life.vue                -->中间包括轮播图的那部分，几乎全是图片的部分
        menu.vue                -->全部分类部分
        silder.vue              -->单独的轮播图组件，在life.vue文件中引用
    public
        header                  -->包括搜索框往上面的部分
            index.vue           -->用于导出header下的其他组件
            nav.vue             -->页面右上角，什么我的美团，网址导航那部分
            searchbar.vue       -->整个搜索框部分
            topbar.vue          -->除了搜索框的所有顶部部分
            user.vue            -->用户登陆注册部分
            geo.vue             -->页面左上角，城市切换部分
        footer                  
            index.vue           -->底部部分
pages
    index.vue                   -->中间部分
layout
    default.vue                 -->最终显示页面

nuxt.config.js          配置文件：可以引入项目所需文件，像css文件，还可以配置很多其他文件

补充一个：
layout
    default.vue：
        <template>
          <el-container class="layout-default">
            <el-header height="197px">
              <myHeader></myHeader>                 ---> public/header/index.vue
            </el-header>
            <el-main>
              <nuxt/>                               ---> pages/index.vue
            </el-main>
            <el-footer>Footer</el-footer>           ---> public/footer/index.vue
          </el-container>
        </template>
```

#### 右上角->我的美团，手机app，商家中心，网址导航
1. 思考
    + 如何节省网络请求
        - 这部分的内容直接写死
    + 如何语义化
    + DOM最简化
2. 右上角"我的美团"等部分
    ```
    用最简单的dom结构实现比较复杂交互
        因为"我的美团" 这部分的内容既要兼顾着同级平行结构，又要有照顾到下面"我的订单"等那部分的内容，所以在这里并不将它和"我的订单"等部分内容放在一个结构里
    ```
2. 网址导航部分
    ```
    官网上这部分的列表结构是有标题有内容
        所以我们采取利用dl不是ul，，因为dl中dt和dd正好符合标题和内容这样的结构
    ```

#### 搜索框部分
1. 热门搜索：聚焦后 没有内容的时候显示热门搜索
2. 相关搜索：聚焦后 有内容时显示相关搜索
3. 这两个彼此独立，放在平行结构中，具体实现如下：
    ```
    1. 利用两个变量
    （1）是否聚焦
        isFocus:false,
    （2）搜索框内容是否为空
        search: ''
    2. 利用计算属性监听：
    （1）isHotPlace:function(){
            //已经聚焦并且搜索内容为空的时候显示热门搜索
            return this.isFocus&&!this.search
        },
    （2）isSearchList:function(){
            //已经聚焦并且搜索内容不为空的时候显示热门搜索
            return this.isFocus&&this.search
        }
    3. 利用v-if决定是否热门搜索要显示
    （1）热门搜索栏 -> v-if="isHotPlace"
    （2）相关推荐栏 -> v-if="isSearchList"
    ```
4. 问题1：当我聚焦后想点击推荐中的链接的时候，会先触发input事件的blur事件，才能点击，所以在点它(链接)之前,已经触发了blur事件，导致你点击这个链接，没有生效
    + 解决：就是我在失去焦点的时候，把isFocus的变化做个延时的处理
        ```
        blur: function(){
                //setInterval和setTimeout中传入函数时，函数中的this会指向window对象，所以用self现将this存起来
                let self = this;
                setTimeout(function(){
                    self.focus = false
                },200)
            }
        ```
5. 问题2：我怎么让推荐的内容随着我的输入内容改变，怎么更改数据发出去
    + 方法1：监听v-model内容，也就是search
    + 方法2： 直接观察input事件，在input标签中增加->监听input事件

#### 全部分类部分
1. 将鼠标划过显示出的部分，单独放在一个组件里，组件里显示什么数据(curdetail.child)，由鼠标划过的kind值决定
    ```
    <dl class="nav" @mouseleave="mouseleave">
        <dt>全部分类</dt>
            //在全部分类部分这样遍历
        <dd v-for="(item, index) in menu" :key="index" @mouseenter="enter">
            <i :class="item.type"/>{{item.name}} <span class="arrow"/>
        </dd>
    </dl>
    <div class="detail" v-if="kind">
            //在每个分类子项这样遍历
        <template v-for="(item,index) in curdetail.child">
            <h4 :key="index">{{item.title}}</h4>
            <span v-for="v in item.child" :key="v">
                {{v}}
            </span>
        </template>
    </div>
    ```
2. 鼠标划过分类项的时候绑定事件 @mouseenter="enter",
    用于取到kind值，判断当前鼠标是在哪个分类中，是美食还是酒店等等
    ```
        enter: function(e){
            this.kind = e.target.querySelector('i').className 
        }
    ```
3. 鼠标离开全部分类大框后绑定事件，@mouseleave="mouseleave"
    让kind值为空，实现鼠标离开后，分类项下的组件不显示
    ```
        mouseleave(){
            let self = this;
            let self_time = setTimeout(function(){
                self.kind = '';
            },150)
        },
    ```
4. 分类项下的组件(详细分类)实现：我只设置一个组件，然后让数据改变，就实现了，每个详细分类都不一样的效果
    + 数据格式：
        ```
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
        ```
    + 展示在详细分类里的数据curdetail.child，放在计算属性中，这样，kind改变就能触发这个值的改变
        ```
        computed:{
            curdetail: function(){
                            // 设置过滤器  ->  取到所有type和kind相等数据中的第一个
                let res = this.menu.filter(item => item.type === this.kind)[0]
                return res
            }
        },
        ```
5. 因为全部分类下的分类项和分类项下的组件是并行结构，也就是我要是鼠标移入到分类项下的组件部分，就算做成移出了全部分类，这样的话，依照之前的原理，mouseleave触发事件令kind值为空，组件就会不显示，也就是说，我没法实现，移动到分类项下的组件，所以要解决这个问题
    ```
    <div class="detail" v-if="kind" @mouseenter="temEnter" @mouseleave="temLeave">
    给 分类项下的组件 绑定事件
    @mouseenter="temEnter"     --> 如果移入到是这个组件，就将定时器清除
        temEnter: function(){
            clearTimeout(this._timer),
        },
    @mouseleave="temLeave"     --> 如果从这个组件彻底移出，那就将kind改变就可以了
        temLeave: function(){
            this.kind = ''
        }
    ```
6. footer部分
问题：