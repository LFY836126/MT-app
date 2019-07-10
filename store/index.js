import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    modules: {
        geo,
        home,
    },
    actions: {
        // 见Nuxt工作流
        async nuxtServerInit({commit}, {req, app}){
            // 1. 请求接口，请求axios类库，为什么写app呢，因为这个时候没有dom实例，拿不到类似对象，拿不到vue实例，只能拿到app，axios类库也是挂载到app下面的，虽然拿不到vue实例对象，但是可以拿到app实例，这个时候可以拿到asyncData的
            const {status, data: {province, city}} = await app.$axios.get('/geo/getPosition')
            // console.log(province, city);
            // 利用vuex做提交，
            commit('geo/setPosition', status === 200?{city, province}:{city: '', province: ''})
            // 在接口中已经做过一次检查了，为什么要再次做检查：因为那个检查是在服务端做的，这个检查是在客户端做的，那个检查是保证通信时200的时候，那个检查不影响我们浏览器端，所以安全起见，还是要再做一次这个事情

            const {status: status2, data:{menu}} = await app.$axios.get('geo/menu');
            commit('home/setMenu', status2 === 200 ? menu : [])

            const {status: status3, data:{result}} = await app.$axios.get('/search/hotPlace', {
                params: {
                    // city:app.store.state.geo.position.city.replace('市','')
                    // city:app.store.state.geo.position.city.replace('市','')
                    city:'哈尔滨',
                }
            })
            // console.log(result);
            commit('home/setHotPlace', status3 === 200? result : [])
        }
    }
})

export default store