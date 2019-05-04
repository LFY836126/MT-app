import Router from 'koa-router'
import axios from './utils/axios'
let router = new Router({
    // 定义一个前缀
    prefix:'/geo'
})
const sign = '5027812'
router.get('/getPosition', async(ctx) =>{
    let {status, data:{province, city}} = await axios.get(``)
})
export default router;