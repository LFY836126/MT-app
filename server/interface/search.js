import Router from 'koa-router'
import axios from './utils/axios'
// import Poi from '../dbs/models/poi'
let router = new Router({
    // 定义一个前缀
    prefix:'/search'
})
const sign = 'edd92c72150b5512e58ab248b57700ff'

router.get('/top', async(ctx) =>{
  //     try {
  //   let top = await Poi.find({
  //     'name': new RegExp(ctx.query.input),
  //     city: ctx.query.city
  //   })
  //   ctx.body = {
  //     code: 0,
  //     top: top.map(item => {
  //       return {
  //         name: item.name,
  //         type: item.type
  //       }
  //     }),
  //     type: top.length ? top[0].type : ''
  //   }
  // } catch (e) {
  //   ctx.body = {
  //     code: -1,
  //     top: []
  //   }
  // }
    let {status, data:{top}} = await axios.get(`http://cp-tools.cn/search/top`, {
        params: {
            input : ctx.query.input,
            city: ctx.query.city,
            sign,
        }
    })
    ctx.body = {
        top: status === 200? top: [],
    }
})

router.get('/hotPlace', async (ctx)=>{
    // let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
    // try {
    //     let result = await Poi.find({
    //     city,
    //     type: ctx.query.type || '景点'
    //     }).limit(10)
    
    //     ctx.body = {
    //     code: 0,
    //     result: result.map(item => {
    //         return {
    //         name: item.name,
    //         type: item.type
    //         }
    //     })
    //     }
    // } catch (e) {
    //     ctx.body = {
    //     code: -1,
    //     result: []
    //     }
    // }
    // 现在是拿不到vuex的数据的，因为请求是模拟的，不带cookies
    let city = ctx.store?ctx.store.geo.position.city: ctx.query.city;
    let {status, data:{result}} = await axios.get(`http://cp-tools.cn/search/hotPlace`, {
        params: {
            sign,
            // 服务端没有做编码的要求，所以这里我们不用编码
            city: city, 
        }
    })
    ctx.body = {
        result: status === 200? result : []
    }
})

router.get('/resultsByKeywords', async (ctx) =>{
    const {city, keyword} = ctx.query;
    let {status, data:{count, pois}} = await axios.get(`http://cp-tools.cn/search/resultsByKeywords`, {
        params:{
            city,
            keyword,
            sign
        }
    })
    console.log()
    ctx.body = {
        count: status === 200? count: 0,
        pois : status ===200? pois : [],
    }
})
export default router