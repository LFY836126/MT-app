## 问题
1. 搜索失去焦点，热门推荐还在
2. 还有莫名其妙会报错，会出现什么靓丽什么的搜索结果
3. 注册时候同一个验证码也可以注册
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
1. 新知识点的网址：
    + koa-passport: `https://segmentfault.com/a/1190000011557953`/`https://www.jianshu.com/p/622561ec7be2`
    + axios: `https://segmentfault.com/q/1010000016473273?sort=created`
    + 邮件发送：`https://www.jianshu.com/p/04e596da7d33`
    + koa: `https://www.liaoxuefeng.com/wiki/1022910821149312/1099752344192192`
    + koa-route: `https://www.jianshu.com/p/0d59a4270997`
    + 实战笔记：`https://www.cnblogs.com/xiaozhumaopao`
2. 
    ```
    components
        changeCity                  -->城市选择页面的所有
            iselect.vue             -->按省份选择等，那一栏的
            hot.vue                 -->热门城市 那栏
            categroy.vue            -->按拼音首字母选择 那栏
        products                    -->产品列表页，就是点击搜索出来的页面
            categroy.vue            -->分类，区域的部分
            crumbs.vue              -->中间哈尔滨美团>哈尔滨失恋博物馆 
            iselect.vue             -->分类,区域栏中偏右边的部分，像周边游，香坊区等部分
            list.vue                -->
            product.vue             -->
        detail                      -->产品详情页，就是点击产品出现的页面
            crumbs.vue              -->
            item.vue                -->
            list.vue                -->
            summary.vue             -->
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
        register.vue                -->注册组件
        login.vue                   -->登录组件
        exit.vue                    -->退出组件
        register.vue                -->注册组件
        changeCity                  -->城市选择组件
        products.vue                -->产品列表页
        detail.vue                  -->产品详情页
    layout
        default.vue                 -->最终显示页面
        blank.vue                   -->放置register.vue，login，exit的模版文件
    server
        dbs
            models                  -->放置数据库数据
                user.js             -->users表，包括usename，password，email
                categroy.js
                city.js
                menu.js
                poi.js
                province.js
            config.js               -->数据库配置文件(smtp服务, redis连接, mongodb连接)
        interface
            utils
                axios.js            -->定义axios的配置项
                passport.js         -->利用koa-passport简便的实现登录注册功能(序列化，反序列化，local策略)
            users.js                --> 登录系列接口定义(登录，退出，获取用户名，注册，验证等)
            geo.js                  -->城市，系列接口定义(获取所有城市，热门城市，获取省份等)
        index.js                    -->定义支持服务的接口文件(passport, session, 路由, 数据库， 处理post请求等)
    store 
        modules                     -->vuex子模块
            geo.js                  -->当前城市
            home.js                 -->全部分类下的详细分类
        index.js                    -->vuex模块(汇总子模块并且定义一些操作)

    redis启动->找到安装目录(develop)->redis-server
    mongoose启动->找到安装目录(develop)->mongod

    支付逻辑在13-1的7.06分处，可以自己写

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

#### 用户类接口设计
```
/users/signup           注册接口
/users/signin           登陆接口
/users/verify           验证接口     
/users/exit             退出
/users/getUser          登陆状态获取用户名
```
1. 问题1：
    ```
    问：退出(exit.vue)组件中，为什么用中间件来实现退出操作呢，
    答： 因为，我们要求到达退出页面之后，自动的去执行，而不是像按了什么按钮去执行，
        所以利用middleware机制，触发这个获取退出的接口，让这个接口响应完之后，
        我们再做自动化的执行动作
    ```

#### 城市服务接口
```
/geo/getPosition       在接口发出请求到服务端，服务端根据当前的ip来查库，给出你当前城市的名称
/geo/province          获取省份的接口
/geo/province/:id      给出你指定的id的省份，每一个省份都有一个对应的id，根据id可以查询到这个省份下面所有管辖的城市
/geo/city              获取所有城市（不是按省份分类的城市）
/geo/hotCity           获取热门城市
/geo/menu              获取全部分类下的菜单数据
```
1. 问题1：
    ```
    问： 如何将接口反映到城市上去
    答： 两种办法
    （1）直接在组件中请求接口，通过异步的方式，然后更改dom
    （2）用SSR方式，在服务端渲染的时候，拿到接口的值，返回页面，用户体验更高，因为过来的时候已经带来了结果
    ```
2. 问题2： vuex
 travel笔记、 vuex.vuejs.org/zh/guide/modules.html、    Nuxt工作流部分的nuxtServerInit
3. 获取唯一标示
    + 网址：http://cp-tools.cn/sign
    + 7296092/4224626
4. 项目总结：`https://www.cnblogs.com/jielin/p/10258316.html`
5. 慕课实战问答网址：https://coding.m.imooc.com/questiondetail.html?qid=101986(通过更改qid后面的内容查看问答)
6. 注意
    + axios.get是请求页面获得数据的
    + axios.post是发送数据的
    + router.get/post是定义我当前路由(页面)操作的，比如我在这个页面返回别人数据，或者我定义个加减乘除操作啥的
7. 流程：
    ```
    store 
        modules                     -->vuex子模块
            geo.js                  -->当前城市
            home.js                 -->全部分类下的详细分类
        index.js                    -->vuex模块(汇总子模块并且定义一些操作)

    1. 先定义子模块(geo.js/home.js等),子模块内容包括state,mutations,actions
    2. 在父模块中(index.js)引入子模块
    3. 父模块中actions部分
        注意1：nuxtServerInit({commit}, {req, app}){}
        注意2：const {status, data: {province, city}} = await app.$axios.get('/geo/getPosition')  => 通过接口返回数据
        注意3： commit('geo/setPosition', status === 200?{city, province}:{city: '', province: ''})   => 将获得数据传入Vuex子模块，然后前端页面就可以获得数据了
        注意4： /geo/getPosition   => 接口(server/interface/geo.js)，返回给我们的数据也是通过axios获取的：await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
        actions: {
                // 见Nuxt工作流
                async nuxtServerInit({commit}, {req, app}){
                    // 1. 请求接口，请求axios类库，为什么写app呢，因为这个时候没有dom实例，拿不到类似对象，拿不到vue实例，只能拿到app，axios类库也是挂载到app下面的，虽然拿不到vue实例对象，但是可以拿到app实例，这个时候可以拿到asyncData的
                    const {status, data: {province, city}} = await app.$axios.get('/geo/getPosition')
                    // console.log(province, city);
                    // 利用vuex做提交，
                    commit('geo/setPosition', status === 200?{city, province}:{city: '', province: ''})
                    // 在接口中已经做过一次检查了，为什么要再次做检查：因为那个检查是在服务端做的，这个检查是在客户端做的，那个检查是保证通信时200的时候，那个检查不影响我们浏览器端，所以安全起见，还是要再做一次这个事情
                }
            }
    ```
8. 如何判断SSR效果是不是正确：通过查看源码，因为这个是服务端打回给自己的模板
9. lodash详解：`https://segmentfault.com/a/1190000015312430`

#### 查询类接口
```
/search/top
/search/resultsByKeysWords      根据任何一个关键词可以查出来所有相关的列表
/search/hotPlace                热门景点/热门搜索
/search/products                查询列表，我们点击某一个关键词并进入后，它会在产品列表页推荐所有的产品
/search/products/:id            根据每个产品的id查询这个产品的详情
```

### 城市选择页面：changeCity
1. 这个页面的难点
    + 拼音首字母怎么写，如果写26个英文字母标签再插入，是很失败的
    + 如何通过后端给定接口，返回城市后，根据字母来分类
        - 一个字母对应城市的显示
        - 点击字母，快速定位到该字母对应的所有城市

#### 按省份选择iselect.vue 那栏
1. 先确定选择结构怎么用element-ui实现
2. 确定需要哪些数据province，city.....
3. 将省份和城市做关联(利用watch监听属性)，根据省份获取城市(利用axios)
4. 在页面被加载之前将省份获取过来，(mounted时候，axios请求数据)
5. 直接搜索部分，数据的处理
    + 利用延时处理lodash的debounce函数

#### 热门城市hot.vue 那栏
1. 结构采用dl dt dd，因为是一个标题，很多内容
2. 在mounted声明周期函数中获取数据渲染

#### 按拼音首字母选择categroy.vue 那栏
1. 确定显示字母用的节点，利用dl dt dd
2. 点击字母，快速定位到该字母对应的所有城市->利用a标签的#，具体见代码
3. 左侧字母，右侧城市部分，选择合适的数据格式，有利于dom结点的减少
4. 将每个字母对应的城市选择出来, 将数据改为需要的格式，将字母连带着城市进行排序显示

### 产品列表页(products)，就是点击搜索出来的页面
1. 分为三部分
    + 哈尔滨美团哈尔滨哈尔滨融创乐园：crumbs.vue
    + 分类，区域的部分：categroy.vue,iselect.vue
    + 智能排序，景点详情部分
2. 获取数据：通过SSR方式结合接口，将数据进行过滤，阶段等操作
3. 注意decode和encode的问题：query的很多插件在源码中进行了decode，所以用的时候，有的已decode了，自己就没必要再写一遍了，会报错

#### 分类，区域的部分：categroy.vue
1. dom结构分析：利用dl里面两个dt(分类和全部)和一个dd，dd里面循环引入组件iselect.vue,展示分类右边的数据，像什么周边游，生活服务之类的
2. 数据分析：将每一项都用一个公共的组件iselect.vue来实现，通过组件中数据的改变来实现页面的布局
3. 具体见代码

#### 智能排序，景点详情部分
1. dom结构采用dl和dd，将智能排序，价格排序，人气等放在一个数组中，利用v-for循环输出数据
2. 下面每个景点的信息利用组件(item)循环输出，每个item包括图片，描述等信息

#### 地图控件
1.  `https://lbs.amap.com/api/javascript-api/guide/overlays/toolbar`

### 详情页开发 detail.vue
#### 需求分析
1. 产品列表页-> |登录| -> 产品详情页-> |登录| ->购物车(中间有一个登录拦截)
2. 结构(element-ui)，样式(scss)建立起来
3. 组件关系分析：
    ```
    我的产品详情页不能和购物车做一一映射的关系，所以产品详情页和不能通过关键词来跳转到购物车页面
    我们想要的关系就是
        在我点之前，购物车是不存在的，意味着没有路由，也没有生成好的购物车，然后产品详情页需要做的是，点击之后发送一个异步请求，告诉服务端，我现在要购买了，需要创建一个购物车，然后告诉我购物车的地址，然后成功之后，我才能跳转，然后我跳转过去之后将一些关键的信息带给他，比如说产品id，这个时候相当于就是现在的购物车和产品id有一个关系，至少是这个产品id属于这个购物车
    ```
4. 逻辑：
    + 在detail.vue中有一部分是商家团购及优惠下面的部分，需要判断是否显示，显示的条件是登录或者有数据，利用v-if实现
    + 根据不同的状态我们要显示不同的信息，所以提前将两种情况都写出来，再利用v-if和v-else决定显示哪种
5. 获取数据：利用asyncData，但是注意asyncData的执行周期和返回结果
    + 执行时间：是在服务器端执行的，不是浏览器端，是在渲染到页面之前就取得数据了，然后和数据一起渲染页面，所以keyword和type是通过ctx.query获取到数据的
    + 返回数据：和data有某种关联，所以，返回数据后，data就不用同样再写一次了

### 购物车页面
#### 需求分析
1. 购物车-> |登录| ->支付-> |登录| ->查看订单(中间有一个登录拦截)
2. 组件关系分析：
    ```
    购物车会先创建一个订单，在创建之后才能跳转到支付页面，支付是一个公共页面，但是需要考虑支付的是哪个订单，就是支付和订单之间有一个依赖逻辑，但是支付和购物车之间是没有依赖逻辑的，虽然说支付这个动作是由购物车发起的，但是购物车和支付之间是没有一一映射的关系的，他们两个之间的桥梁是订单
    ```
3. 查看订单：查看当前用户下面的所有订单，未支付的，已支付的等，
    + 注意：支付和订单之间也没有一对一的关系的，查看订单 查看的是这个账户下面所有的订单列表，和支付没有关系
    + 在后端，支付和订单之间一定要验证登录，因为在支付之后跳转到查看订单时候，我要确定查看的是谁的订单
    + 按照订单属性分类：
        - 全部订单：账号下面的所有订单
        - 待付款：提交订单，但 是没有付款
        - 待使用：已经付款但是没有消费
        - 带评价：
        - 退款/售后：
4. 数据模型的创建：订单和购物车中的商品进行关联，关联的数据有项目名称，项目id，单价，数量及支付的金额
5. 结构设计(pages>cart.vue)：设计一个平行结构，考虑购物车为空和不为空的两种情况
6. 订单和应付金额之间的联系(pages>cart.vue)：就是当订单中count发生改变，通过scope.row.count就能改变当前引用对象值的， 所以cartData中的count值就会改变，因为cartData是由父组件传过来的，所以，父组件中cart中的count值就会改变，所以computed监听到改变，应付金额的值就会改变
7. 补充：新建一个接口：先再interface下的utils中创建接口，然后在index.js文件中引入
8. 商品的补充(detail>item.vue)： 实际应用中，浏览器传给服务端一个产品的id，然后这个id对应产品库中的某个商品，然后再将该商品的名称，价钱等信息传给服务端，但是我们这里没有真正的产品库，所以，只能通过 直接传给服务端商品的名称，价钱等信息，来获取服务器端对应的数据 这样的方式
9. 购物车跳转(detail>item.vue)：因为我们点击商品之后，需要先创建一个购物车，然后再跳转到该购物车，中间是通过购物车id进行连接的
10. 数据的获取(pages>cart.vue)：两种方式
    + SSR：我在页面下发的时候就把数据塞进去了
        - SSR方式，用户体验好，用户直接拿到信息，
        - 连 接口都保护起来了，比如说我创建购物车接口，我根本就暴露不出来，因为这个动作是在服务端执行的，客户端看不到创建购物车
    + 拿到空页面之后额外请求数据

