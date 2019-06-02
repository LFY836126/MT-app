import Router from 'koa-router';
import axios from './utils/axios'
import Cart from '../dbs/models/cart'
import md5 from 'crypto-js/md5'

let router = new Router({prefix: '/cart'})

// 创建购物车接口，为了安全起见，使用post
router.post('/create', async ctx => {
  // 创建购物车要做一个登录拦截
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    // 时间是String类型的
    let time = Date()
    // 每个购物车专有id,这里用time，不是新建一个Date，因为精度可能有丢失
    let cartNo = md5(Math.random() * 1000 + time).toString()
    // 获取浏览器端传来的数据，因为是post，所以用request不是query获取数据
    let {
      params: {
        id, 
        detail
      }
    } = ctx.request.body
    // 创建购物车
    let cart = new Cart({id, cartNo, time, user: ctx.session.passport.user, detail})
    // 保存到数据库中
    let result = await cart.save()
    if (result) {
      ctx.body = {
        code: 0,
        msg: '',
        id: cartNo
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'fail'
      }
    }
  }
})


// 获取购物车信息接口
router.post('/getCart', async ctx => {
  let {id} = ctx.request.body
  // console.log(id);
  // try容错处理，对比上面的result新写法
  try {
    let result = await Cart.findOne({cartNo: id})
    ctx.body = {
      code: 0,
      data: result
        ? result.detail[0]
        : {}
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      data: {}
    }
  }
})

export default router
